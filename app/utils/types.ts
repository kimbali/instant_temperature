export interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  primary?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface ButtonLinkProps {
  children: React.ReactNode;
  to: string;
  primary?: boolean;
}

export interface CardProps {
  title?: string;
  text?: string | null;
  children?: React.ReactNode;
  className?: string;
}

export interface InputProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

export interface ErrorMessageProps {
  children: React.ReactNode;
  hasError: boolean;
}

export interface SubtitleProps {
  children: React.ReactNode;
}

export interface TextProps {
  children: React.ReactNode;
  size?: string;
  color?: string;
  className?: string;
}

export interface TitleProps {
  children: React.ReactNode;
}

export interface OneDay {
  day: string;
  date: string;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
}

export interface TemperatureDate {
  currentTemperature: number;
  geoLocation: string;
  forecast: OneDay[];
  trend: OneDay[];
  latitude: number;
  longitude: number;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface LatLngEx {
  lat: number;
  lng: number;
}

export interface TomorrowParams {
  lat: string;
  lng: string;
  endDate?: Date;
  totalDays?: number;
}

export interface UserLogin {
  password: FormDataEntryValue;
  identifier: FormDataEntryValue | null;
}

export interface UserRegister {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  username: FormDataEntryValue;
}