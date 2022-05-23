import Container from '@mui/material/Container';
import { AppBar } from '../../components/app-bar/app-bar';
import { PoemsList } from "../../components/poems-list/poems-list";


export function MainPage() {
  return (
    <Container maxWidth="md">
      <AppBar />
      <PoemsList />
    </Container>
  )
}
