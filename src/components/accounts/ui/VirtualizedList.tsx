import {
  useRef,
  useEffect,
  createContext,
  forwardRef,
  useContext,
} from 'react';
import { VariableSizeList } from 'react-window';

const Row = ({ data, index, style }) => {
  const elem = data[index];
  return (
    <div style={style}>
      <>{elem}</>
    </div>
  );
};

const useResetCache = (data: any) => {
  const ref = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
};

const OuterElementContext = createContext({});
const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});
export const VirtualizedList = forwardRef((props: any, ref: any) => {
  const itemCount = props.children.length;
  const gridRef = useResetCache(itemCount);
  const outerProps = { ...props };
  delete outerProps.children;
  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={outerProps}>
        <VariableSizeList
          ref={gridRef}
          outerElementType={OuterElementType}
          className="List"
          height={400}
          width="auto"
          itemCount={itemCount}
          itemSize={() => props.rowheight}
          overscanCount={5}
          itemData={{ ...props.children }}
        >
          {Row}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});
