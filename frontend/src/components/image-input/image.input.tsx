import { useState } from 'react';
import {
  useController,
  Control,
  FieldErrors,
  FieldValues,
  FieldPath,
} from 'react-hook-form';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';

interface Properties<T extends FieldValues> {
  control: Control<T, null>;
  name: FieldPath<T>;
  errors?: FieldErrors<T>;
  label: string;
  placeholder: string;
}

const ImageInput = <T extends FieldValues>({
  control,
  name,
  errors,
  label,
  placeholder,
}: Properties<T>) => {
  const { field } = useController({ name, control });
  const [previews, setPreviews] = useState<File[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setPreviews((prev) => [...prev, ...newFiles]);
    field.onChange([...field.value, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    field.onChange(updatedPreviews);
  };

  const error = errors ? errors[name]?.message : undefined;
  const hasError = Boolean(error);

  return (
    <div className={styles['uploader']}>
      <span className={getValidClassNames(styles['input-label-text'])}>
        {label}
      </span>
      <label className={styles['label']}>
        {placeholder || 'Choose images'}
        <input
          type="file"
          accept="image/*"
          multiple
          className={styles['input']}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
      <div className={styles.previewContainer}>
        {previews.map((file, index) => (
          <div key={index} className={styles.preview}>
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className={styles.image}
            />
            <button
              type="button"
              onClick={() => removeFile(index)}
              className={styles.removeButton}
            >
              x
            </button>
          </div>
        ))}
      </div>
      {hasError && (
        <span className={styles['input-error']}>{error as string}</span>
      )}
    </div>
  );
};

export { ImageInput };
