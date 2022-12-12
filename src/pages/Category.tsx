import { useQuery } from '@tanstack/react-query';

import { getCategoryQuery } from '../api/categoryApi';
import Loading from '../components/Backdrop/Loading';
import Helmet from '../components/Helmet/Helmet';
import CategoryTabs from '../containers/Category/CategoryTabs';
import { getCategoryCollection } from '../helpers/categoryHelper';

const Category = () => {
  const categoryQuery = useQuery(getCategoryQuery());

  if (categoryQuery.isLoading) {
    return <Loading />;
  }

  const categoryList = categoryQuery.data ? categoryQuery.data : [];
  const categoryCollection = getCategoryCollection(categoryList);

  return (
    <>
      <Helmet title='Category' />
      <CategoryTabs categoryCollection={categoryCollection} />
    </>
  );
};

export default Category;
