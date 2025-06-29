import React, { useState } from 'react'
import styles from "./styles.module.scss"
import SearchHeader from '../SearchHeader/SearchHeader'
import logo from "../../assets/png/logo-chitay-gorod.png"
import HeaderButtons from '../HeaderButtons/HeaderButtons'
import { CatalogButton } from '../CatalogButton/CatalogButton'
import AuthorizationModal from '../AuthorizationModal/AuthorizationModal'
import { SideBar } from '../SideBar/SideBar'

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [openSideBar, setOpenSideBar] = React.useState(false);

  const toggleDrawer = (open: boolean) => {
    console.log(open);
    setOpenSideBar(open);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={styles.header}>
        <img src={logo} className={styles.logo} />
        <CatalogButton toggleDrawer={toggleDrawer} />
        <SearchHeader />
        <HeaderButtons handleOpen={handleOpen} />
      </div>
      <div>
        {open && <AuthorizationModal handleClose={handleClose} open={open} />}
        {openSideBar && <SideBar toggleDrawer={toggleDrawer} open={openSideBar} />}
      </div>
    </>
  )
}

export default Header