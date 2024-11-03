

const contactInfo = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 12h18m-9 7h9" />
        </svg>
      ),
      title: 'Phone:',
      details: ['+410 123 456 789', '+410 987 654 321'],
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5m0 0L5 12h14l-7-7z" />
        </svg>
      ),
      title: 'Address:',
      details: ['Haltenstrase, Lugaggia.', 'Switzerland - 6953'],
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12V8m0 0l-8 8m8-8H8v8" />
        </svg>
      ),
      title: 'Email:',
      details: ['no@themedraft.com', 'replay@themedraft.com'],
    },
  ];
  
  const ContactSection = () => {
    return (
      <div className="bg-white dark:bg-black py-16 ">
        <div className="text-center mb-10">
          <p className="text-red-500 text-sm uppercase font-bold">Get In Touch</p>
          <h1 className="text-4xl font-bold text-gray-800 relative  dark:text-gray-200">
            Feel Free To Contact
          </h1>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2"></div>
        </div>
  
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
          {contactInfo.map((info) => (
            <div key={info.id} className="bg-blue-50 p-8 rounded-lg flex items-start hover:scale-110 transition-all hover:translate-y-[-30px] cursor-pointer ">
              <div className="bg-white p-3 rounded-md shadow-lg mr-4">
                {info.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{info.title}</h3>
                {info.details.map((detail, index) => (
                  <p key={index} className="text-gray-600">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ContactSection;
  