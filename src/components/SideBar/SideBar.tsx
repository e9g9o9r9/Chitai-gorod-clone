import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import styles from "./styles.module.scss"


interface Props {
    toggleDrawer: (open: boolean) => void
    open: boolean
}

export const SideBar: React.FC<Props> = ({ toggleDrawer, open }) => {

    const categories = useAppSelector(state => state.catergories.categories)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    const sortedCategories = [...categories].sort((a, b) => +a.id - +b.id);

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
            <List>
                {sortedCategories.map((category) => (
                    <ListItem key={category.id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={category.icon} className={styles.image} />
                            </ListItemIcon>
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={() => toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
