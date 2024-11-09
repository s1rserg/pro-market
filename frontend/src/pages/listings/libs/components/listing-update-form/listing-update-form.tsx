import {
  ListingResponseDto,
  ListingUpdateRequestDto,
  ListingUpdateRequestSchema,
} from '~/common/types/types';
import styles from './styles.module.css';
import { useAppForm } from '~/hooks/hooks';
import { useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { Button, Input } from '~/components/components';

type Properties = {
  onSubmit: (payload: ListingUpdateRequestDto) => void;
  listing: ListingResponseDto;
};

const ListingUpdateForm = ({ onSubmit, listing }: Properties): JSX.Element => {
  const { description, name } = listing;

  const { control, errors, handleSubmit, handleTrigger } =
    useAppForm<ListingUpdateRequestDto>({
      defaultValues: { description, name },
      validationSchema: ListingUpdateRequestSchema,
    });

  const descriptionValue = useWatch({
    control,
    defaultValue: description,
    name: 'description',
  });

  const isDescriptionCounterShown = !errors['description']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: ListingUpdateRequestDto) => {
      onSubmit(formData);
    })(event_);
  };

  useEffect(() => {
    void handleTrigger('description');
  }, [descriptionValue, handleTrigger]);

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input
        autoComplete="name"
        control={control}
        errors={errors}
        label="Name"
        name="name"
      />
      <div className={styles['description-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Description"
          name="description"
          rowsCount={4}
        />
        {isDescriptionCounterShown && (
          <span className={styles['description-counter']}>
            {descriptionValue?.length}/{500}
          </span>
        )}
      </div>
      <div className={styles['button-wrapper']}>
        <Button label="Update" type="submit" />
      </div>
    </form>
  );
};

export { ListingUpdateForm };
