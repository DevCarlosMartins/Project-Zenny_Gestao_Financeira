import { useEffect, useState } from 'react';

export interface Coupon {
  id: string;
  name: string;
  sponsor: string;
  discount: number;
  icon: string; // icon name from lucide-react
  color: string; // pastel color hex
  createdAt: string;
}

const STORAGE_KEY = 'coupons';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
    } catch (e) {
      // ignore
    }
  }, [coupons]);

  const addCoupon = async (couponData: Omit<Coupon, 'id' | 'createdAt'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    setCoupons(prev => {
      const updated = [...prev, newCoupon];
      return updated;
    });

    return { success: true, coupon: newCoupon };
  };

  const deleteCoupon = async (id: string) => {
    try {
      setCoupons(prev => prev.filter(c => c.id !== id));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  const clearAll = async () => {
    setCoupons([]);
  };

  return { coupons, addCoupon, deleteCoupon, clearAll };
};
