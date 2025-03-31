"use client"; // Ensures hooks work properly in Next.js

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PopUp: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasClosed && window.scrollY > 300) {
        setShowPopup(true);
      }
    };

    const debounceScroll = () => {
      setTimeout(handleScroll, 500); // Debounce effect, triggers after 500ms
    };

    window.addEventListener("scroll", debounceScroll);
    return () => window.removeEventListener("scroll", debounceScroll);
  }, [hasClosed]); // Re-run only if `hasClosed` changes

  const handleClose = () => {
    setShowPopup(false);
    setHasClosed(true); // Prevents reopening
    localStorage.setItem("popupDismissed", "true"); // Store dismissal in localStorage
  };

  useEffect(() => {
    if (localStorage.getItem("popupDismissed") === "true") {
      setHasClosed(true);
    }
  }, []);

  return showPopup ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-80 relative"
      >
        <IconButton
          onClick={handleClose}
          className="absolute top-2 right-2"
        >
          <CloseIcon />
        </IconButton>
        <h2 className="text-lg font-semibold">🔥 Special Offer! 🔥</h2>
        <p>Get 20% off your first order. Limited time only!</p>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClose}
        >
          Claim Offer
        </Button>
      </motion.div>
    </div>
  ) : null;
};

export default PopUp;
