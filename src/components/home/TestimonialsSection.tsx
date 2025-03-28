
const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground">
            Hear from Canadians who found their perfect smart home solutions using our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            initials="MJ"
            name="Michael Johnson"
            location="Toronto, ON"
            testimonial="The quiz recommended a Ring security system that was perfect for my condo. Easy to install and exactly what I needed."
            rating={5}
          />
          
          <TestimonialCard 
            initials="SC"
            name="Sarah Chen"
            location="Vancouver, BC"
            testimonial="I was connected with a Bell Smart Home consultant who helped design the perfect system for my new house. Couldn't be happier!"
            rating={5}
          />
          
          <TestimonialCard 
            initials="DP"
            name="David Patel"
            location="Calgary, AB"
            testimonial="The energy efficiency recommendations helped me save over $300 on my utilities last year. The ecobee thermostat was a game-changer."
            rating={4}
          />
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  initials: string;
  name: string;
  location: string;
  testimonial: string;
  rating: number;
}

const TestimonialCard = ({ initials, name, location, testimonial, rating }: TestimonialCardProps) => {
  return (
    <div className="glass-card p-8">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
          <span className="text-primary font-semibold">{initials}</span>
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <p className="text-muted-foreground">
        "{testimonial}"
      </p>
      <div className="mt-4 flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`${i < rating ? 'text-amber-500' : 'text-gray-300'}`}
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
