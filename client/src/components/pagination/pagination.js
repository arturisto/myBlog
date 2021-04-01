import Pagination from "react-bootstrap/Pagination";
import { PAGINATIONTYPE } from "../../utils/enums";

const createPagination = (activeItem, maxPages, clickFunction) => {
  let paginationItems = [];
  const revisedMaxPages = Math.max(1, maxPages - 4);
  const startPagination = Math.min(
    revisedMaxPages,
    activeItem > 2 ? activeItem - 2 : 1
  );
  const endPagination = Math.min(
    maxPages,
    Math.max(5, activeItem < maxPages - 2 ? activeItem + 2 : maxPages)
  );
  // const endPagination = activeItem < maxPages - 2 ? activeItem + 2 : maxPages;

  console.log(endPagination);
  for (let i = startPagination; i <= endPagination; i++) {
    paginationItems.push(
      activeItem === i ? (
        <Pagination.Item
          key={i}
          active
          onClick={() => clickFunction(i, PAGINATIONTYPE.NUMBER)}
        >
          {" "}
          {i}
        </Pagination.Item>
      ) : (
        <Pagination.Item
          key={i}
          onClick={() => clickFunction(i, PAGINATIONTYPE.NUMBER)}
        >
          {" "}
          {i}
        </Pagination.Item>
      )
    );
  }

  return paginationItems;
};

export function Paging(props) {
  const activeItem = props.activeItem;
  const maxPages = props.maxPages;
  const clickFunction = props.clickFunction;
  const pagination = createPagination(activeItem, maxPages, clickFunction);
  return (
    <div className="pagination m-auto">
      <Pagination>
        <Pagination.First
          onClick={() => clickFunction(0, PAGINATIONTYPE.FIRST)}
        />
        <Pagination.Prev
          onClick={() => clickFunction(0, PAGINATIONTYPE.PREV)}
        />
        {pagination.map(function (item, i) {
          return item;
        })}

        {/* <Pagination.Ellipsis
          onClick={() => clickFunction(0, PAGINATIONTYPE.ELLIPSIS)}
        /> */}
        <Pagination.Next
          onClick={() => clickFunction(0, PAGINATIONTYPE.NEXT)}
        />
        <Pagination.Last
          onClick={() => clickFunction(0, PAGINATIONTYPE.LAST)}
        />
      </Pagination>
    </div>
  );
}
