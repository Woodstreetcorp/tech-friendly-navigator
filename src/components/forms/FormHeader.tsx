
import { X } from 'lucide-react';

interface FormHeaderProps {
  title: string;
  description: string;
  onClose: () => void;
}

const FormHeader = ({ title, description, onClose }: FormHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button 
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
    </>
  );
};

export default FormHeader;
