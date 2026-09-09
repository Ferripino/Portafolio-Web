import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { projects } from './data/projects'

export default function Home() { return <><Header /><main><Hero /><Projects projects={projects} /><Skills /><Contact /></main><Footer /></> }
