export type HomePostImageProps = {
  src: string;
  alt: string;
};

const HomePostImage = ({ src, alt }: HomePostImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        objectFit: 'cover',
        width: '100%',
        maxWidth: '1920px',
        height: '100%',
        display: 'block',
        margin: 'auto'
      }}
    />
  );
};

export default HomePostImage;
