import { Stack } from "evergreen-ui";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from "reactstrap";
// import { Dropdown, Stack, Spinner } from "react-bootstrap";

const Wallet = ({ address, amount, symbol, destroy }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  if (address) {
    return (
      <>
        <div className="d-flex ">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              {" "}
              {amount ? (
                <>
                  {amount} <span className="ms-1"> {symbol}</span>
                </>
              ) : (
                <Spinner animation="border" size="sm" className="opacity-25" />
              )}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>
                {" "}
                <div
                  href={`https://explorer.testnet.near.org/accounts/${address}`}
                  target="_blank"
                >
                  <div direction="horizontal" gap={2}>
                    <i className="bi bi-person-circle fs-4" />
                    <span className="font-monospace">{address}</span>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                {" "}
                <div className="shadow-lg border-0">
                  {/* <Dropdown.Divider /> */}
                  <div
                    as="button"
                    className="d-flex align-items-center"
                    onClick={() => {
                      destroy();
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2 fs-4" />
                    Disconnect
                  </div>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </>
    );
  }

  return null;
};

export default Wallet;
