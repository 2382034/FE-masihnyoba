// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

// Layouts
import BaseLayout from "./layouts/BaseLayout";
import RootLayout from "./layouts/RootLayout";

// Core & Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// --- Import Recipes Pages ---
import Recipes from "./pages/Recipes";
import AddRecipes from "./pages/AddRecipes";
import RecipesDetail from "./pages/RecipesDetail";
import EditRecipes from "./pages/EditRecipes";
// --- End Import Recipes Pages ---

// --- Import Posting Pages ---
import Postings from "./pages/Postings";
import AddPosting from "./pages/AddPosting";
import PostingDetail from "./pages/PostingDetail";
import EditPosting from "./pages/EditPosting";
// --- End Import Posting Pages ---

// --- Import Note Pages ---
import Note from "./pages/Note";
import AddNote from "./pages/AddNote";
import NoteDetail from "./pages/NoteDetail";
import EditNote from "./pages/EditNote";
// --- End Import Note Pages ---

// =======================================================
// ---  BARU: Import Halaman Data Mahasiswa ---
// =======================================================
// Menggunakan nama komponen dan path file yang baru
import DataMahasiswa from "./pages/DataMahasiswa";
import AddMahasiswa from "./pages/AddMahasiswa";
import EditMahasiswa from "./pages/EditMahasiswa";
// Catatan: Kita tidak lagi memerlukan halaman detail terpisah
// karena detail bisa dilihat di halaman daftar atau form edit.
// Jika Anda tetap membutuhkannya, kita bisa buat nanti.
// =======================================================


// Utils & Providers
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./utils/AuthProvider";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Layout */}
        <Route path="/" element={<BaseLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        {/* Private Layout */}
        <Route path="/" element={<RootLayout />}>
          {/* Home */}
          <Route
            index // Default route for '/' under RootLayout
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* --- Postings Routes --- */}
          <Route path="postings" element={<PrivateRoute><Postings /></PrivateRoute>} />
          <Route path="add-posting" element={<PrivateRoute><AddPosting /></PrivateRoute>} />
          <Route path="postings/:id" element={<PrivateRoute><PostingDetail /></PrivateRoute>} />
          <Route path="postings/edit/:id" element={<PrivateRoute><EditPosting /></PrivateRoute>} />
          {/* --- End Postings Routes --- */}

          {/* --- Recipes Routes --- */}
          <Route path="recipes" element={<PrivateRoute><Recipes /></PrivateRoute>} />
          <Route path="add-recipe" element={<PrivateRoute><AddRecipes /></PrivateRoute>} />
          <Route path="recipes/:id" element={<PrivateRoute><RecipesDetail /></PrivateRoute>} />
          <Route path="recipes/edit/:id" element={<PrivateRoute><EditRecipes /></PrivateRoute>} />
          {/* --- End Recipes Routes --- */}

          {/* --- Notes Routes --- */}
          <Route path="note" element={<PrivateRoute><Note /></PrivateRoute>} />
          <Route path="add-note" element={<PrivateRoute><AddNote /></PrivateRoute>} />
          <Route path="note/:id" element={<PrivateRoute><NoteDetail /></PrivateRoute>} />
          <Route path="edit-note/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
          {/* --- End Notes Routes --- */}

          {/* =========================================== */}
          {/* --- BARU: RUTE DATA MAHASISWA --- */}
          {/* =========================================== */}
          {/* Path utama untuk daftar mahasiswa */}
          <Route 
            path="mahasiswa" 
            element={
              <PrivateRoute>
                <DataMahasiswa />
              </PrivateRoute>
            } 
          />
          {/* Path untuk menambah mahasiswa baru */}
          <Route 
          path="mahasiswa/add" 
          element={ <PrivateRoute requiredRole="admin"><AddMahasiswa /></PrivateRoute> } 
          />
          
          {/* Path untuk mengedit mahasiswa berdasarkan ID */}
          <Route 
          path="mahasiswa/edit/:id" 
          element={ <PrivateRoute requiredRole="admin"><EditMahasiswa /></PrivateRoute> } 
          />
          {/* =========================================== */}
          {/* --- END RUTE DATA MAHASISWA --- */}

        </Route> {/* End RootLayout Routes */}
      </Route> // End Base Route
    )
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
