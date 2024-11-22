import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Placeholder } from '.';

const Child = dynamic(() => import('revamp/ui/EnterpriseGrowth'), {
  loading: Placeholder,
});

const Index = (props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  return <div ref={ref}>{inView && <Child {...props} />}</div>;
};

export default Index;
