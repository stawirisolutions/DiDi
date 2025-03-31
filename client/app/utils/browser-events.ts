'use client'

/**
 * Utility functions for handling browser events safely in Next.js
 * These functions check for browser environment before using browser-specific APIs
 */

/**
 * Safely creates and dispatches a custom event
 * @param eventName - The name of the custom event to dispatch
 * @param detail - Optional data to include with the event
 */
export const dispatchCustomEvent = (eventName: string, detail?: any) => {
  if (typeof window !== 'undefined') {
    const event = detail 
      ? new CustomEvent(eventName, { detail }) 
      : new CustomEvent(eventName);
    
    window.dispatchEvent(event);
  }
};

/**
 * Safely adds an event listener
 * @param eventName - The name of the event to listen for
 * @param handler - The event handler function
 * @returns A function to remove the event listener
 */
export const addSafeEventListener = (
  eventName: string, 
  handler: EventListener
): (() => void) => {
  if (typeof window !== 'undefined') {
    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }
  return () => {}; // Return empty cleanup function for SSR
};

/**
 * Check if code is running in browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Wishlist-specific utilities
 */
export const wishlistEvents = {
  updated: 'wishlistUpdated',
  itemAdded: 'wishlistItemAdded',
  itemRemoved: 'wishlistItemRemoved'
};

/**
 * Dispatch wishlist updated event
 */
export const notifyWishlistUpdated = (detail?: any) => {
  dispatchCustomEvent(wishlistEvents.updated, detail);
};

/**
 * Update the wishlist count from localStorage
 * @param setCountFunction - State setter function to update count
 */
export const updateWishlistCount = (setCountFunction: (count: number) => void) => {
  if (typeof window !== 'undefined') {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const wishlistArray = JSON.parse(savedWishlist);
        setCountFunction(Array.isArray(wishlistArray) ? wishlistArray.length : 0);
      } else {
        setCountFunction(0);
      }
    } catch (error) {
      console.error('Error updating wishlist count:', error);
      setCountFunction(0);
    }
  }
};