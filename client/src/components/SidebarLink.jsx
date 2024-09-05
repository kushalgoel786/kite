import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const SidebarLink = ({ to, children }) => {
  return (
    <Wrapper>
      <NavLink
        to={to}
        end
        className="transition px-6 py-2 block font-semibold text-lg hover:text-gray-900 hover:shadow hover:bg-gray-200">
        {children}
      </NavLink>
    </Wrapper>
  );
};

export default SidebarLink;

const Wrapper = styled.div`
  @layer components {
    .active {
      color: #111827 !important;
      background-color: #f3f4f6;
    }
  }
`;
