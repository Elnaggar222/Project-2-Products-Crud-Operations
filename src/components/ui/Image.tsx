interface IProps {
  className?: string;
  src: string;
  alt: string;
}

const Image = ({ alt, className, src }: IProps) => {
  return <img src={src} alt={alt} className={className} />;
};

export default Image;
