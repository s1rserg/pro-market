import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  createListingRequestDto,
  ListingResponseDto,
  updateListingRequestDto,
} from '~/common/types/types';

const fetchAllListings = createAsyncThunk<
  ListingResponseDto[],
  void,
  AsyncThunkConfig
>(`${name}/fetchAll`, async (_, { extra: { listingsService } }) => {
  return await listingsService.getAll();
});

const fetchListingById = createAsyncThunk<
  ListingResponseDto,
  string,
  AsyncThunkConfig
>(`${name}/fetchById`, async (id, { extra: { listingsService } }) => {
  return await listingsService.getById(id);
});

const createListing = createAsyncThunk<
  ListingResponseDto,
  createListingRequestDto,
  AsyncThunkConfig
>(`${name}/create`, async (data, { extra: { listingsService } }) => {
  return await listingsService.create(data);
});

const updateListing = createAsyncThunk<
  ListingResponseDto,
  { id: string; data: updateListingRequestDto },
  AsyncThunkConfig
>(`${name}/update`, async ({ id, data }, { extra: { listingsService } }) => {
  return await listingsService.update(id, data);
});

const deleteListing = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${name}/delete`,
  async (id, { extra: { listingsService } }) => {
    await listingsService.delete(id);
  }
);

export {
  fetchAllListings,
  fetchListingById,
  createListing,
  updateListing,
  deleteListing,
};
