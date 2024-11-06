import { IconName } from '~/common/types/types.js';
import { ICON_SIZE } from './libs/constants/constants.js';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers.js';
import { Icon } from '../components.js';

type Properties = {
  iconName: IconName;
  isDisabled?: boolean;
  label: string;
  onClick: () => void;
  variant?: 'outlined' | 'primary';
};

const IconButton = ({
  iconName,
  isDisabled = false,
  label,
  onClick,
  variant = 'primary',
}: Properties): JSX.Element => {
  const isOutlined = variant === 'outlined';
  const buttonClasses = getValidClassNames({
    [styles['icon-button'] as string]: true,
    [styles['outlined'] as string]: isOutlined,
  });

  return (
    <button
      aria-label={label}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      type="button"
    >
      <span className="visually-hidden">{label}</span>
      <Icon height={ICON_SIZE} name={iconName} width={ICON_SIZE} />
    </button>
  );
};

export { IconButton };
