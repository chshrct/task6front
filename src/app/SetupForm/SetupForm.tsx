import { FC, useEffect, useRef } from 'react';

import { useFormik } from 'formik';
import lodash from 'lodash';
import { Button, Form, Stack } from 'react-bootstrap';

import { useScrollBottom } from 'hooks/useScrollBottom';
import { useAppDispatch } from 'store';
import { appApi, useGetLocalizationsQuery, useLazyGetPageQuery } from 'store/api/appApi';
import { getPagesResponseType } from 'store/api/types';

const SEED_LENGTH = 99999;
const PAGE_SIZE = 10;
const DEFAULT_PAGES_COUNT = 2;
const DEBOUCE_TIMEOUT = 500;

type PropsType = {
  getPages: any;
  pagesData: getPagesResponseType | undefined;
  isGetPagesFetching: boolean | undefined;
};

export const SetupForm: FC<PropsType> = ({ getPages, pagesData, isGetPagesFetching }) => {
  const { data: localizationsData } = useGetLocalizationsQuery();
  const dispatch = useAppDispatch();
  const [
    getPage,
    { data: getPageData, isFetching: isGetPageFetching, isSuccess: isGetPageSuccess },
  ] = useLazyGetPageQuery();

  const currentPagesCount = pagesData
    ? Math.max(pagesData.length / PAGE_SIZE, DEFAULT_PAGES_COUNT)
    : DEFAULT_PAGES_COUNT;

  const formik = useFormik({
    initialValues: {
      countryCode: 'en_US',
      errors: 0,
      seed: 0,
    },
    onSubmit(values) {
      const request = { ...values, pagesCount: DEFAULT_PAGES_COUNT };

      getPages(request);
    },
  });

  const { countryCode, errors, seed } = formik.values;
  const getPagesCount = useRef(DEFAULT_PAGES_COUNT);

  useEffect(() => {
    const timerId = setTimeout(() => {
      getPages({
        countryCode,
        errors,
        seed,
        pagesCount: currentPagesCount,
      });
      getPagesCount.current = currentPagesCount;
    }, DEBOUCE_TIMEOUT);

    return () => {
      clearTimeout(timerId);
    };
  }, [countryCode, errors, seed, getPages]);

  useScrollBottom(isGetPageFetching, pagesData, getPage, countryCode, errors, seed);

  useEffect(() => {
    if (isGetPageSuccess && getPageData)
      dispatch(
        appApi.util.updateQueryData(
          'getPages',
          {
            countryCode,
            errors,
            seed,
            pagesCount: getPagesCount.current,
          },
          draft => {
            getPageData.forEach(person => draft.push(person));
          },
        ),
      );
  }, [isGetPageSuccess, getPageData, dispatch, countryCode, errors, seed]);

  const onRandomSeedClick = (): void => {
    formik.setFieldValue('seed', lodash.random(0, SEED_LENGTH));
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Stack gap={3}>
        <Form.Group controlId="countryCode">
          <Form.Label>Region</Form.Label>
          <Form.Select
            aria-label="Default select example"
            disabled={isGetPagesFetching}
            {...formik.getFieldProps('countryCode')}
          >
            {localizationsData?.map(({ country, countryCode, id }) => (
              <option key={id} value={countryCode}>
                {country}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="errors">
          <Form.Label>Number of errors</Form.Label>
          <Form.Range
            min={0}
            max={10}
            step={0.25}
            disabled={isGetPagesFetching}
            {...formik.getFieldProps('errors')}
          />
          <Form.Control
            type="number"
            max={1000}
            min={0}
            step={0.25}
            disabled={isGetPagesFetching}
            {...formik.getFieldProps('errors')}
          />
        </Form.Group>
        <Form.Group controlId="seed">
          <Form.Label>Seed</Form.Label>
          <Form.Control
            type="text"
            disabled={isGetPagesFetching}
            {...formik.getFieldProps('seed')}
          />
          <div className="d-flex justify-content-end mt-2">
            <Button onClick={onRandomSeedClick} disabled={isGetPagesFetching}>
              Random seed
            </Button>
          </div>
        </Form.Group>
        {/* <a
          href={`https://itransition-task6-back.herokuapp.com/getCSV?pagesCount=${currentPagesCount}&countryCode=${countryCode}&seed=${seed}&errors=${errors}`}
        >
          <Button className="w-100">Download CSV</Button>
        </a> */}
      </Stack>
    </Form>
  );
};
