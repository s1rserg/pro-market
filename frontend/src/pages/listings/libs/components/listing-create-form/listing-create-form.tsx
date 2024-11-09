import {
  ListingCreateRequestDto,
  ListingCreateRequestSchema,
} from '~/common/types/types.js';
import { DEFAULT_LISTING_CREATE_PAYLOAD } from './libs/constants/constants.js';
import { useAppForm } from '~/hooks/hooks.js';
import { useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { Button, Input } from '~/components/components.js';
import styles from './styles.module.css';

type Properties = {
  onSubmit: (payload: ListingCreateRequestDto) => void;
};

const ListingCreateForm = ({ onSubmit }: Properties): JSX.Element => {
  const { control, errors, handleSubmit, handleTrigger } =
    useAppForm<ListingCreateRequestDto>({
      defaultValues: DEFAULT_LISTING_CREATE_PAYLOAD,
      validationSchema: ListingCreateRequestSchema,
    });

  const descriptionValue = useWatch({
    control,
    defaultValue: '',
    name: 'description',
  });

  const isDescriptionCounterShown = !errors['description']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: ListingCreateRequestDto) => {
      onSubmit(formData);
    })(event_);
  };

  useEffect(() => {
    void handleTrigger('description');
  }, [descriptionValue, handleTrigger]);

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input
        autoComplete="given-name"
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
            {descriptionValue.length}/{500}
          </span>
        )}
      </div>

      <div className={styles['button-wrapper']}>
        <Button label="Create" type="submit" />
      </div>
    </form>
  );
};

export { ListingCreateForm };
