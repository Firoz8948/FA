"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles, Calendar, Quote } from "lucide-react";

interface StorySection {
  type: "text" | "image" | "video";
  content?: string;
  src?: string;
  caption?: string;
  date?: string;
}

const STORY: StorySection[] = [
  {
    type: "text",
    content: "Hey my love,\nLet’s start this letter by telling how much I love you.\n\nSuppose if my love for you can be counted in stars, then definitely my stars can make a universe bigger than this one. I love you so much, my jaan ❤️🥀\n\nI love you more than I show, more than I make you feel, more than you think, more than you know.\nThe best is yet to come. With every passing day, my love will keep increasing."
  },
  {
    type: "text",
    content: "You remember how we started?\nJust with some texts, then I promised not to let you go ever.\nAnd then so many messages and calls, and finally we met for the first time."
  },
  {
    type: "image",
    src: "/assets/popup1.webp",
    caption: "Our First Meeting",
    date: "4 May, 2025"
  },
  {
    type: "text",
    content: "This day was the best. We met for the first time. Hum bike pe itna mast ghume. Main tumhare pet ko dekh ke muh udhar kar liya 🫢 Tumhe thoda thoda touch kiya, tumne mere shoulder pe sar rakha. Everything was so perfect ❤️\n\nThen again we kept talking. So many mood swings of yours, but I managed it all… because I love you the most. Then again we planned to meet."
  },
  {
    type: "image",
    src: "/assets/popup2.webp",
    caption: "The First Kiss",
    date: "3 Nov 2025"
  },
  {
    type: "text",
    content: "Phir hum fir se mile Virar mein, aur iss baar main meri baby ko ghumaya, khatta khilaya… but tumse imli gir gayi, pata nahi kaise 😂\n\nThat day in the theatre, we kissed for the first time. And I still remember that fragrance of your body and the taste of your lips."
  },
  {
    type: "text",
    content: "And after that, I could not even think once about leaving you. I felt you so close, and I started loving my baby much more than before.\n\nAnd this time we met in a room. That day, every single moment is saved in my mind like a memory that can never be deleted. I love that day. We were not just kissing, we were lost in each other. ❤️"
  },
  {
    type: "image",
    src: "/assets/popupbg.webp",
    caption: "Lost in Each Other",
    date: "30 Nov 2025"
  },
  {
    type: "text",
    content: "And the same thing kept going… I started loving you more and more. I never thought that I could love someone this much. Aur mujhe dusro ko dekh ke lagta tha “kya pyaar-vyaar”… but now I understand everything.\n\nEven while writing this, I am feeling all of it again.\n\nSo we met again… but that meeting was not good, as I made my baby cry. And that was the first and last time that happened between us. I am so sorry, my love. I will never let that happen again in our whole life, my sweetie 🫂"
  },
  {
    type: "image",
    src: "/assets/popup4.webp",
    caption: "My Cute Baby",
    date: "9 Feb 2026"
  },
  {
    type: "text",
    content: "And I am really sorry for that day. My baby was looking so cute, and still I made you cry. I am so sorry, my girl. But as I promised, I fixed things and made our relationship stronger than before.\n\nThen we met again and spent some quality time. Humne khaya, shopping ki, aur jab meri baby happy happy ho gayi, tabhi main wapas gaya ❤️"
  },
  {
    type: "text",
    content: "We met on 14 Feb 2026\n\nAnd I hope I fixed everything that day. Main yahan itna likh hi raha hoon toh ye bhi likh deta hoon… I love you so much, my jaaneman, my wifeyy, my love 🫂❤️\n\nLo ek aur idea mil gaya 😂 Ek section banaunga jahan pe wo sab likhunga jo jo main tumhe bolta hoon… like My Baby ❤️ My Love ❤️ and so on\n\nSo let’s come to the point… Phir Ramzan aa gaya, and I couldn’t meet you the whole month. But sabr ka fal meetha hota hai…"
  },
  {
    type: "video",
    src: "/assets/vdo4.mp4",
    caption: "Mera Meetha Fal 👀",
    date: "21 March 2026"
  },
  {
    type: "text",
    content: "And this story will continue till Firoz is alive…\nAnd now, we are on the internet until this world uses the internet ❤️🌍"
  }
];

export const CuteMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="pt-12 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-base/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center relative z-10 p-12 bg-white rounded-[48px] border-2 border-dashed border-pink-soft/40 shadow-xl shadow-pink-base/5"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 bg-pink-light rounded-full flex items-center justify-center text-pink-base shadow-inner"
          >
            <Heart className="w-8 h-8 fill-pink-base" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black text-pink-deep font-alice leading-tight">
            Our Story, Your Letter
          </h2>
          
          <button
            onClick={() => setIsOpen(true)}
            className="group relative px-10 py-5 bg-pink-base hover:bg-pink-deep text-white rounded-full font-alice text-xl transition-all duration-300 shadow-xl shadow-pink-base/20 hover:shadow-pink-base/40 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-3">
               Click here to read ✨
            </span>
          </button>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-pink-deep/40 backdrop-blur-xl cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-4xl h-[85vh] bg-white rounded-[40px] shadow-2xl border-4 border-pink-base/10 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Background Image */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "url('/assets/popupbg.webp')", backgroundSize: 'cover' }}
              />

              {/* Header */}
              <div className="p-6 border-b border-pink-light/30 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-light rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-base fill-pink-base" />
                  </div>
                  <span className="font-alice text-xl text-pink-deep font-bold italic">To My Jaaneman...</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 hover:bg-pink-light rounded-full transition-colors text-pink-soft hover:text-pink-base"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Scrollable Story Content */}
              <div className="flex-grow overflow-y-auto p-4 md:p-12 no-scrollbar scroll-smooth bg-[#FFF9FA]">
                <div className="max-w-2xl mx-auto space-y-12">
                  {STORY.map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {section.type === "text" && (
                        <div className="relative">
                          <Quote className="absolute -top-6 -left-8 w-12 h-12 text-pink-base/10 -rotate-12" />
                          <p className="font-alice text-xl md:text-2xl text-pink-deep leading-relaxed whitespace-pre-wrap">
                            {section.content}
                          </p>
                        </div>
                      )}

                      {section.type === "image" && (
                        <div className="space-y-4">
                           <div className="bg-white p-3 pb-10 rounded-lg shadow-xl border-2 border-pink-base/5 -rotate-2 hover:rotate-0 transition-transform duration-500">
                             <div className="aspect-[4/5] md:aspect-[3/2] overflow-hidden rounded-md">
                               <img 
                                  src={section.src} 
                                  alt={section.caption} 
                                  className="w-full h-full object-cover"
                               />
                             </div>
                             <div className="mt-4 flex justify-between items-center px-2">
                               <span className="font-alice text-pink-base text-lg font-bold">{section.caption}</span>
                               <span className="flex items-center gap-1 text-pink-soft text-sm italic font-bold">
                                 <Calendar className="w-3 h-3" />
                                 {section.date}
                               </span>
                             </div>
                           </div>
                        </div>
                      )}

                      {section.type === "video" && (
                        <div className="space-y-4">
                           <div className="bg-white p-3 pb-6 rounded-3xl shadow-2xl border-4 border-pink-base/10">
                             <div className="aspect-[3/4] md:aspect-video overflow-hidden rounded-2xl bg-black">
                               <video 
                                  src={section.src} 
                                  autoPlay 
                                  loop 
                                  muted 
                                  playsInline
                                  className="w-full h-full object-cover"
                               />
                             </div>
                             <div className="mt-4 text-center">
                               <p className="font-alice text-pink-deep text-xl font-bold italic underline decoration-pink-base/30">{section.caption}</p>
                               <span className="text-pink-soft text-sm font-bold opacity-60">{section.date}</span>
                             </div>
                           </div>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Final Signature */}
                  <div className="pt-12 text-center border-t border-pink-light/50">
                    <Sparkles className="w-10 h-10 text-pink-base/30 mx-auto mb-6 animate-pulse" />
                    <p className="font-cardo italic text-pink-soft text-2xl font-bold">
                      Yours Always, Firoz ❤️
                    </p>
                    <p className="text-pink-base/40 text-sm mt-2 font-bold tracking-tighter">EST. 2025</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
