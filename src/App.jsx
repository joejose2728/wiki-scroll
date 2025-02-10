import { useState, useEffect, useCallback, useRef } from 'react';
import { ThemeProvider, CssBaseline, CircularProgress, Box, Alert, Snackbar } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import { createTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  const [articles, setArticles] = useState([]);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const loadingRef = useRef(false);

  const fetchArticles = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://${language}.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&grnlimit=10&origin=*`
      );
      
      if (!response.data.query?.pages) {
        throw new Error('No articles found');
      }

      const pages = response.data.query.pages;
      const pageIds = Object.keys(pages).join('|');

      const detailsResponse = await axios.get(
        `https://${language}.wikipedia.org/w/api.php?action=query&format=json&pageids=${pageIds}&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=original&origin=*`
      );

      if (!detailsResponse.data.query?.pages) {
        throw new Error('Failed to fetch article details');
      }

      const newArticles = Object.values(detailsResponse.data.query.pages).map(page => ({
        id: page.pageid,
        title: page.title,
        extract: page.extract || 'No description available',
        image: page.original?.source || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png',
        url: `https://${language}.wikipedia.org/wiki/${encodeURIComponent(page.title)}`
      }));
      
      setArticles(prev => [...prev, ...newArticles]);
      setHasMore(true);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error.message);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
      loadingRef.current = false;
    }
  }, [language, hasMore]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 1000) {
      fetchArticles();
    }
  }, [fetchArticles]);

  const handleLanguageChange = useCallback((newLanguage) => {
    if (newLanguage === language) return;
    
    setLanguage(newLanguage);
    setArticles([]); // Clear existing articles
    setHasMore(true);
    setInitialLoading(true);
    loadingRef.current = false;
  }, [language]);

  // Handle scroll events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle language changes and initial load
  useEffect(() => {
    fetchArticles();
  }, [language, fetchArticles]);

  useEffect(() => {
    fetchArticles();
  }, []); // Empty dependency array for initial load only

  if (initialLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div style={{ minHeight: '100vh' }}>
          <Header 
            language={language} 
            setLanguage={handleLanguageChange}
          />
          <div style={{ padding: '20px', marginTop: '64px' }}>
            <AnimatePresence mode="popLayout">
              {articles.map((article, index) => (
                <motion.div
                  key={`${article.id}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.1, 1) }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            )}
          </div>
        </div>
      </BrowserRouter>
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
