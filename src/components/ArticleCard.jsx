import React from 'react';
import { Card, CardMedia, Typography, IconButton, Box, Tooltip } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ArticleCard = ({ article }) => {
  if (!article) return null;

  return (
    <Card 
      sx={{ 
        maxWidth: 600, 
        margin: '20px auto',
        position: 'relative',
        height: '80vh',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}
    >
      <CardMedia
        component="img"
        image={article.image}
        alt={article.title}
        sx={{
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.6)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.95) 30%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px',
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Typography 
              variant="h5" 
              component="div"
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                flex: 1,
                pr: 2,
              }}
            >
              {article.title}
            </Typography>
            <Tooltip title="Read on Wikipedia" placement="left">
              <IconButton
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white',
              mb: 3,
              display: '-webkit-box',
              WebkitLineClamp: 6,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              lineHeight: 1.6,
              fontSize: '1rem',
            }}
          >
            {article.extract}
          </Typography>
        </motion.div>
      </Box>
    </Card>
  );
};

export default ArticleCard;
