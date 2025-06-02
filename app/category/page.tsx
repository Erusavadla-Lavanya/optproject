'use client'; 
interface CategoryPageProps {
    params: { slug: string }
  }
  
  const CategoryPage = ({ params }: CategoryPageProps) => {
    return (
      <div>
        <h1>Category: {params.slug}</h1>
        {/* Use params.slug to fetch dynamic data */}
      </div>
    );
  };
  
  export default CategoryPage;
  