import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllListings,
  createListing,
  updateListing,
  deleteListing,
  fetchListingById,
} from './actions';
import { ListingResponseDto, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface ListingsState {
  listing: null | ListingResponseDto;
  listings: ListingResponseDto[];
  status: ValueOf<typeof DataStatus>;
  listingStatus: ValueOf<typeof DataStatus>;
  listingCreateStatus: ValueOf<typeof DataStatus>;
  listingDeleteStatus: ValueOf<typeof DataStatus>;
  listingUpdateStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: ListingsState = {
  listing: null,
  listings: [],
  status: DataStatus.IDLE,
  listingStatus: DataStatus.IDLE,
  listingCreateStatus: DataStatus.IDLE,
  listingDeleteStatus: DataStatus.IDLE,
  listingUpdateStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllListings.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(fetchAllListings.fulfilled, (state, action) => {
        state.listings = action.payload;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(fetchAllListings.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch listings');
      })
      .addCase(fetchListingById.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.listingStatus = DataStatus.SUCCESS;
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.listingStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch listing');
      })
      .addCase(createListing.pending, (state) => {
        state.listingCreateStatus = DataStatus.PENDING;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.listings = [action.payload, ...state.listings];
        state.listingCreateStatus = DataStatus.SUCCESS;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.listingCreateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to create listing');
      })
      .addCase(updateListing.pending, (state) => {
        state.listingUpdateStatus = DataStatus.PENDING;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        const updatedListing = action.payload;
        state.listings = state.listings.map((listing) =>
          listing.id === updatedListing.id ? updatedListing : listing
        );
        state.listingUpdateStatus = DataStatus.SUCCESS;
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.listingUpdateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to update listing');
      })
      .addCase(deleteListing.pending, (state) => {
        state.listingDeleteStatus = DataStatus.PENDING;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        const deletedListingId = action.meta.arg;
        state.listings = state.listings.filter(
          (listing) => listing.id.toString() !== deletedListingId
        );
        state.listingUpdateStatus = DataStatus.SUCCESS;
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.listingDeleteStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to delete listing');
      });
  },
});

export { reducer, name, actions };
