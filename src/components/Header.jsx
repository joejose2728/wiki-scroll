import { AppBar, Toolbar, Typography, Select, MenuItem, FormControl, InputLabel, Box, Divider } from '@mui/material';
import { Language as LanguageIcon, MenuBook as MenuBookIcon } from '@mui/icons-material';

const Header = ({ language, setLanguage }) => {
  const languages = [
    // North America
    { code: 'en', name: 'English (US)', flag: '🇺🇸', region: 'North America' },
    
    // Europe
    { code: 'en-gb', name: 'English (UK)', flag: '🇬🇧', region: 'Europe' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', region: 'Europe' },
    { code: 'fr', name: 'French', flag: '🇫🇷', region: 'Europe' },
    { code: 'de', name: 'German', flag: '🇩🇪', region: 'Europe' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', region: 'Europe' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', region: 'Europe' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱', region: 'Europe' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱', region: 'Europe' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', region: 'Europe' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪', region: 'Europe' },
    
    // Latin America
    { code: 'pt-br', name: 'Portuguese (Brazil)', flag: '🇧🇷', region: 'Latin America' },
    
    // India
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', region: 'India' },
    { code: 'bn', name: 'Bengali', flag: '🇮🇳', region: 'India' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', region: 'India' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', region: 'India' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', region: 'India' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', region: 'India' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', region: 'India' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳', region: 'India' },
    
    // East Asia
    { code: 'zh', name: '中文', flag: '🇨🇳', region: 'East Asia' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', region: 'East Asia' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', region: 'East Asia' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', region: 'East Asia' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭', region: 'East Asia' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', region: 'East Asia' },
  ];

  // Group languages by region
  const groupedLanguages = languages.reduce((acc, lang) => {
    if (!acc[lang.region]) {
      acc[lang.region] = [];
    }
    acc[lang.region].push(lang);
    return acc;
  }, {});

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuBookIcon sx={{ fontSize: 24 }} />
          <Typography variant="h6" component="div" sx={{ fontSize: '1.1rem' }}>
            WikiScroll
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ fontSize: '0.8rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LanguageIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: '0.8rem' }}>Language</Typography>
            </Box>
          </InputLabel>
          <Select
            value={language}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LanguageIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: '0.8rem' }}>Language</Typography>
              </Box>
            }
            onChange={(e) => setLanguage(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400,
                },
              },
            }}
            sx={{ fontSize: '0.8rem' }}
          >
            {Object.entries(groupedLanguages).map(([region, langs]) => [
              <Typography
                key={region}
                variant="caption"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  display: 'block',
                  fontWeight: 'bold',
                  backgroundColor: 'action.selected',
                  fontSize: '0.7rem',
                }}
              >
                {region}
              </Typography>,
              langs.map((lang) => (
                <MenuItem 
                  key={`${lang.code}-${lang.flag}`} 
                  value={lang.code}
                  sx={{ 
                    fontSize: '0.8rem',
                    py: 0.5,
                    minHeight: '32px',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '1rem' }}>{lang.flag}</Typography>
                    <Typography sx={{ fontSize: '0.8rem' }}>{lang.name}</Typography>
                  </Box>
                </MenuItem>
              )),
              <Divider key={`${region}-divider`} />
            ])}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
