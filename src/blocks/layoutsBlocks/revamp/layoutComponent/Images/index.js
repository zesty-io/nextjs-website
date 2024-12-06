import ZestyImage from 'blocks/Image/ZestyImage';

function Images(props) {
  return (
    <ZestyImage
      width={props?.data?.styles?.maxWidth}
      style={{ ...props?.data?.styles }}
      alt={props?.data?.altText}
      src={props?.data?.content}
    />
  );
}
export default Images;
