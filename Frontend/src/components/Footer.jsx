// eslint-disable-next-line no-unused-vars
import React from 'react';

const credits = {
  Amanda: 'Frontend, Design',
  Owen: 'Backend, Databases',
  Fatima: 'Frontend, Design',
};

function Footer () {
  return (
    <div className="bg-[#acceb0] text-white p-4  rounded-[9px]">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="text-xl text-white font-bold font-['Kreon']">
          Made with ♥ by
        </h3>
        <div className="justify-center items-center gap-5 inline-flex">
          <div className="flex-col justify-start items-end gap-2 inline-flex">
            {Object.keys (credits).map (name => (
              <div
                key={name}
                className="text-wite text-xl font-bold font-['Kreon']"
              >
                {name}
              </div>
            ))}
          </div>
          <div className="w-max flex-col justify-start items-start gap-2 inline-flex">
            {Object.values (credits).map ((role, index) => (
              <div
                key={index}
                className="text-nowrap text-white text-xl font-extralight font-['Kreon']"
              >
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
