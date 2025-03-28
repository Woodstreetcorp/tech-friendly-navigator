
interface ProductImageDisplayProps {
  image: string;
  name: string;
}

const ProductImageDisplay = ({ image, name }: ProductImageDisplayProps) => {
  return (
    <div className="glass-card p-6 flex items-center justify-center">
      <img 
        src={image} 
        alt={name} 
        className="w-full max-w-md h-auto object-contain"
      />
    </div>
  );
};

export default ProductImageDisplay;
