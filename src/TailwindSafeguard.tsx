// This component ensures all TBWA classes are detected by Tailwind's purge process
// It's not rendered but forces the classes to be included in the final CSS
export const TailwindSafeguard = () => {
  return (
    <div className="hidden">
      {/* TBWA Background Colors */}
      <div className="bg-tbwa-black bg-tbwa-white bg-tbwa-yellow bg-tbwa-gray bg-tbwa-lightGray" />
      
      {/* TBWA Text Colors */}
      <div className="text-tbwa-black text-tbwa-white text-tbwa-yellow text-tbwa-gray text-tbwa-lightGray" />
      
      {/* TBWA Border Colors */}
      <div className="border-tbwa-black border-tbwa-white border-tbwa-yellow border-tbwa-gray border-tbwa-lightGray" />
      
      {/* TBWA Hover States */}
      <div className="hover:bg-tbwa-black hover:bg-tbwa-white hover:bg-tbwa-yellow hover:bg-tbwa-gray" />
      <div className="hover:text-tbwa-black hover:text-tbwa-white hover:text-tbwa-yellow hover:text-tbwa-gray" />
      
      {/* Opacity Variants */}
      <div className="bg-opacity-10 bg-opacity-20 bg-opacity-30 text-opacity-70 text-opacity-80 border-opacity-30" />
      
      {/* Scout Colors */}
      <div className="bg-scout-primary bg-scout-secondary text-scout-primary text-scout-secondary" />
    </div>
  )
}