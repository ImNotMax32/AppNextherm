'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage, Message } from '@/components/form-message';
import { signInAction } from '@/app/actions';

export default function Login() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const messageParam = searchParams.get('message');
  const pending = false;

  const message: Message | undefined = messageParam ? {
    text: messageParam,
    type: 'error'
  } : undefined;

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.img 
              transition={{ duration: 0.3 }}
              src="assets/img/X.png"
              alt="Nextherm Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-bold text-gray-900">Nextherm</span>
              <span className="text-4xl font-medium" style={{ color: '#86BC29' }}>Applications</span>
            </div>
          </Link>
        </div>
        <h2 className="mt-8 text-center text-3xl font-extrabold text-gray-900">
          Connexion à votre compte
        </h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <form 
          className="space-y-6" 
          action={signInAction}
        >
          <input type="hidden" name="redirect" value={redirect || ''} />
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={50}
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#86BC29] focus:border-[#86BC29] focus:z-10 sm:text-sm"
                placeholder="Entrez votre email"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </Label>
              <Link
                className="text-xs text-[#86BC29] hover:text-[#75a625] underline"
                href="/forgot-password"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                maxLength={100}
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#86BC29] focus:border-[#86BC29] focus:z-10 sm:text-sm"
                placeholder="Entrez votre mot de passe"
              />
            </div>
          </motion.div>

          {message && <FormMessage message={message} />}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#86BC29] hover:bg-[#75a625] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86BC29] transition-colors duration-200"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Chargement...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </motion.div>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Nouveau sur notre plateforme ?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`/sign-up${redirect ? `?redirect=${redirect}` : ''}`}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#86BC29] transition-colors duration-200"
            >
              Créer un compte
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}