import { useRouter } from 'next/router';

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <h1>Category: {slug}</h1>;
};

export default CategoryPage;
