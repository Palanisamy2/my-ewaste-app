// import React from 'react';
// import ImageScroll from '../assets/reuseComponents/ImageScroll';
// import '../styles/Home.css'; // Optional: Create a separate CSS file for Home component

// const Home = () => {
//     return (
//         <div className="home-container">
//             <h2>Welcome to E-Waste Management Platform</h2>
//             <ImageScroll />
              
//             <div className='about-ewaste-paragraph'>
//             <h1>About E-Waste</h1>
//                 <p>E waste recycling has all sorts of benefits in addition to the protection of human health and the environment. 
//                 Most of the materials that make up our computers and smartphones are derived from non-renewable minerals; recycling 
//                 these materials can prevent the supply of consumer goods that become inevitable in our lives from being suspended 
//                 until substitutions are discovered. Although in certain cases, the non-renewable resources are not necessarily rare, 
//                 the recycling of non-renewable but common minerals still has economic benefits. </p>

//                 <p>
//                 For example, the price of lithium, a non-renewable but relatively common mineral that can almost be found everywhere, 
//                 has been booming. Lithium is widely used in multiple industries but is most known for its importance in the production 
//                 of rechargeable batteries for electric vehicles. The increased public attention on electric vehicles as a way to 
//                 decarbonise transportation saw the demand for lithium soar. Yet, the market has failed to keep up with this sudden 
//                 surge in demand, causing lithium to be in short supply – not scarcity but from the slow pace of extraction and 
//                 refinement. Recycling lithium-ion batteries will provide an additional supply of lithium to the market, allowing 
//                 businesses to produce batteries and electric vehicles that are customer-friendly as well as environmental-friendly at 
//                 a lower price.
//                 </p>
//             </div>

//             <div className='about-ewaste-paragraph'>
//             <h1>How Is E-Waste Recycling Done?</h1>
//                 <p>E-waste recycling is much more complicated than conventional waste recycling. Typically, the first step of the 
//                 recycling process is manual sorting. Once e-waste is collected and transported to the recycling facilities, workers 
//                 sort the e-waste into categories according to their types and models. Then, all electronic devices will be examined, 
//                 and of which the parts that are still functional will be extracted to be reused; they can either be sold as 
//                 individual parts or be combined to form a new phone or computer. The e-waste left behind that is not functional 
//                 will be sent to recycling processing. </p>

//                 <p>
//                 Here, e-waste is thrown into an enormous machine and is shredded into tiny pieces, but before that, it must first go 
//                 through a process called de-manufacturing, which refers to the action of disassembling a product into components. 
//                 This procedure is to remove all the potentially hazardous materials in electronic devices that will destroy the 
//                 machine or contaminate the environment once disposed into landfills. For example, the toner that can be found in a 
//                 photocopier is extremely flammable and explosive, and is certainly capable of blowing up the processing equipment if 
//                 it gets shredded, given that so many things can act as fuel sources, such as plastic. This process is of utmost 
//                 importance and must be performed by skilful workers.
//                 </p>

//                 <p>
//                 Once waste is shredded, metals, the valuable parts that make the e waste recycling a profitable industry, will be 
//                 separated. Unlike the former sessions, this process does not require manual sorting. A giant magnet will first 
//                 attract all the ferromagnetic materials, like iron and steel, that have high susceptibilities to magnetisation. 
//                 Then, further mechanical processing separates other metals and alloys based on a physical law called Eddy Current, 
//                 where paramagnetic materials, materials that are weakly attracted to magnets will be bounced away when an electric 
//                 current is induced by an alternating magnetic field with a repulsive force, while other non-magnetic materials, 
//                 like plastic, will simply keep going.
//                 </p>

//                 <p>
//                 Next, the waste is further separated with water. At this stage, almost everything leftover are non-magnetic 
//                 materials; they will go through another machine filled with water, where materials with a low relative density, 
//                 mostly plastic, will flow, while other materials, like glass, will sink. Finally, before recycled materials are 
//                 sold, is to check if there are any remaining valuable materials stuck to the plastic.
//                 </p>

//             </div>

//             <div className='about-ewaste-paragraph'>
//             <h1>Current Recycling Challenges</h1>
//                 <p>Only 17.4% of documented e-waste was recycled in 2019, according to Statista. This can be partially ascribed to 
//                 the fact that many electronic devices today are not designed to be recycled. Smartphones are becoming lighter and 
//                 slimmer, and their batteries are no longer removable, making recycling much more difficult and labour-intensive. 
//                 Manual sorting requires workers to be constantly exposed to toxic substances, albeit at a low level, over a long 
//                 period, while these difficult-to-recycle electronic devices require facilities to constantly upgrade their machines 
//                 to keep up with the changing technology, lowering the incentive for businesses to recycle e-waste that is already 
//                 difficult to disassemble. </p>

//                 <p>
//                 Another problem the recycling industry is dealing with is that, currently, only 10 out of 60 chemical elements 
//                 present in e-waste can be recycled through mechanical processing: gold, silver, platinum, cobalt, tin, copper, iron, 
//                 aluminium, and lead.
//                 </p>

//                 <p>
//                 Recycling e-waste not only prevents toxic substances from entering our bodies and into the environment, but the 
//                 process also reduces the harmful environmental impacts created by the extraction and mining of virgin materials. 
//                 Besides, the potential economic benefits that can be derived from this industry are enormous. The discarded e-waste 
//                 in 2019  alone was worth more than US$57 billion. Yet, many problems still need to be conquered before the industry 
//                 can reach its full potential, including electronic producers and manufacturers designing more recycling-friendly 
//                 products and further research on mechanical processing in the recycling of the rest of the chemical elements.
//                 </p>

//             </div>
//         </div>
//     );
// };

// export default Home;

import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import ImageScroll from '../assets/reuseComponents/ImageScroll';

const Home = () => {
  
  return (
    <div className="home-container">
      <motion.h2 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        Welcome to E-Waste Management Platform
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <ImageScroll />
      </motion.div>

      <AnimatedSection title="About E-Waste">
      <p>E waste recycling has all sorts of benefits in addition to the protection of human health and the environment. 
                 Most of the materials that make up our computers and smartphones are derived from non-renewable minerals; recycling 
                these materials can prevent the supply of consumer goods that become inevitable in our lives from being suspended 
                 until substitutions are discovered. Although in certain cases, the non-renewable resources are not necessarily rare, 
                 the recycling of non-renewable but common minerals still has economic benefits. </p>
                 <p> For example, the price of lithium, a non-renewable but relatively common mineral that can almost be found everywhere, 
                 has been booming. Lithium is widely used in multiple industries but is most known for its importance in the production 
                 of rechargeable batteries for electric vehicles. The increased public attention on electric vehicles as a way to 
                 decarbonise transportation saw the demand for lithium soar. Yet, the market has failed to keep up with this sudden 
                 surge in demand, causing lithium to be in short supply – not scarcity but from the slow pace of extraction and 
                 refinement. Recycling lithium-ion batteries will provide an additional supply of lithium to the market, allowing 
                 businesses to produce batteries and electric vehicles that are customer-friendly as well as environmental-friendly at 
                 a lower price.</p>
      </AnimatedSection>

      <AnimatedSection title="How Is E-Waste Recycling Done?">

      <p>E-waste recycling is much more complicated than conventional waste recycling. Typically, the first step of the 
                 recycling process is manual sorting. Once e-waste is collected and transported to the recycling facilities, workers 
                 sort the e-waste into categories according to their types and models. Then, all electronic devices will be examined, 
                 and of which the parts that are still functional will be extracted to be reused; they can either be sold as 
                 individual parts or be combined to form a new phone or computer. The e-waste left behind that is not functional 
                 will be sent to recycling processing. </p>

                 <p>
                 Here, e-waste is thrown into an enormous machine and is shredded into tiny pieces, but before that, it must first go 
                 through a process called de-manufacturing, which refers to the action of disassembling a product into components. 
                 This procedure is to remove all the potentially hazardous materials in electronic devices that will destroy the 
                 machine or contaminate the environment once disposed into landfills. For example, the toner that can be found in a 
                 photocopier is extremely flammable and explosive, and is certainly capable of blowing up the processing equipment if 
                 it gets shredded, given that so many things can act as fuel sources, such as plastic. This process is of utmost 
                 importance and must be performed by skilful workers.
                 </p>

                 <p>
                 Once waste is shredded, metals, the valuable parts that make the e waste recycling a profitable industry, will be 
                 separated. Unlike the former sessions, this process does not require manual sorting. A giant magnet will first 
                 attract all the ferromagnetic materials, like iron and steel, that have high susceptibilities to magnetisation. 
                 Then, further mechanical processing separates other metals and alloys based on a physical law called Eddy Current, 
                 where paramagnetic materials, materials that are weakly attracted to magnets will be bounced away when an electric 
                 current is induced by an alternating magnetic field with a repulsive force, while other non-magnetic materials, 
                 like plastic, will simply keep going.
                 </p>

                 <p>
                 Next, the waste is further separated with water. At this stage, almost everything leftover are non-magnetic 
                 materials; they will go through another machine filled with water, where materials with a low relative density, 
                 mostly plastic, will flow, while other materials, like glass, will sink. Finally, before recycled materials are 
                 sold, is to check if there are any remaining valuable materials stuck to the plastic.
                 </p>
                 
      </AnimatedSection>

      <AnimatedSection title="Current Recycling Challenges">
     
                 <p>Only 17.4% of documented e-waste was recycled in 2019, according to Statista. This can be partially ascribed to 
                 the fact that many electronic devices today are not designed to be recycled. Smartphones are becoming lighter and 
                 slimmer, and their batteries are no longer removable, making recycling much more difficult and labour-intensive. 
                 Manual sorting requires workers to be constantly exposed to toxic substances, albeit at a low level, over a long 
                 period, while these difficult-to-recycle electronic devices require facilities to constantly upgrade their machines 
                 to keep up with the changing technology, lowering the incentive for businesses to recycle e-waste that is already 
                 difficult to disassemble. </p>

                 <p>
                 Another problem the recycling industry is dealing with is that, currently, only 10 out of 60 chemical elements 
                 present in e-waste can be recycled through mechanical processing: gold, silver, platinum, cobalt, tin, copper, iron, 
                 aluminium, and lead.
                 </p>

                 <p>
                 Recycling e-waste not only prevents toxic substances from entering our bodies and into the environment, but the 
                 process also reduces the harmful environmental impacts created by the extraction and mining of virgin materials. 
                 Besides, the potential economic benefits that can be derived from this industry are enormous. The discarded e-waste 
                 in 2019  alone was worth more than US$57 billion. Yet, many problems still need to be conquered before the industry 
                 can reach its full potential, including electronic producers and manufacturers designing more recycling-friendly 
                 products and further research on mechanical processing in the recycling of the rest of the chemical elements.
                 </p>

      </AnimatedSection>

     < Footer />
    </div>
  );
};

const AnimatedSection = ({ title, children }) => (
    <motion.div
      className="about-ewaste-paragraph"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>{title}</h1>
      {children}
    </motion.div>
  );
  
  const Footer = () => (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} E-Waste Management. All rights reserved.</p>
        <p>Designed by Palanisamy</p>
      </div>
    </motion.footer>
  );
  

export default Home;
