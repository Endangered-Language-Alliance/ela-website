import Link from "next/link";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

type Resp = {
  data: {
    menuItems: {
      nodes: [{ label: string; path: string; childItems: { nodes: [] } }];
    };
  };
};

function useNavItems() {
  return useQuery("posts", async () => {
    const data = await request(
      API_URL,
      gql`
        query MainMenuQuery {
          menuItems(where: { location: PRIMARY }) {
            nodes {
              ...MenuBits
              childItems {
                nodes {
                  ...MenuBits
                }
              }
            }
          }
        }

        fragment MenuBits on MenuItem {
          label
          path
        }
      `
    );

    return data;
  });
}

export default function Header() {
  const { status, data, error, isLoading } = useNavItems();

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error!</span>;

  return (
    <nav>
      <ul style={{ display: "flex" }}>
        {data.menuItems.nodes.map((node) => {
          const { label, path, childItems } = node;

          console.log(node);
          if (!childItems.nodes.length) {
            return (
              <li key={path}>
                <Link href={path}>
                  <a>{label}</a>
                </Link>
              </li>
            );
          }

          return (
            <Menu>
              <MenuButton>{label}</MenuButton>
              <MenuList>
                {childItems.nodes.length ? (
                  childItems.nodes.map((item) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return <MenuItem key={item.label}>{item.label}</MenuItem>;
                  })
                ) : (
                  <MenuLink as={Link} to={item.path}>
                    Somewhere w/ Reach Router
                  </MenuLink>
                )}
              </MenuList>
            </Menu>
          );
        })}
      </ul>
    </nav>
  );
}
