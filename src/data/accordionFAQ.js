const accordionFAQ = [
    {
        type: "General Questions",
        type_az: "Ümumi Suallar",
        question: 'What is an electric bicycle (e-bike)?',
        question_az: 'Elektrik velosiped (e-velosiped) nədir?',
        answer: 'An electric bicycle (e-bike) is a bicycle equipped with an electric motor that assists with pedaling. This motor can help you travel longer distances and tackle hills more easily.',
        answer_az: 'Elektrik velosiped (e-velosiped) pedal çevirməyə kömək edən elektrik mühərriki ilə təchiz olunmuş velosipeddir. Bu mühərrik sizə uzun məsafələri qət etməyə və təpələri daha asanlıqla qət etməyə kömək edəcək.'
        ,
    },
    {
        type: "General Questions",
        type_az: "Ümumi Suallar",
        question: 'How does an e-bike work?',
        question_az: 'E-velosiped necə işləyir?',
        answer: 'An e-bike uses a battery-powered electric motor to provide assistance when you pedal. The motor kicks in based on your pedaling effort, giving you an extra boost.',
        answer_az: 'E-velosiped pedal çevirməyə kömək edən batareya ilə işləyən elektrik mühərrikindən istifadə edir. Mühərrik pedallara basdığınız təzyiqdən asılı olaraq işə düşür və əlavə təkan verir.'
        ,
    },
    {
        type: "Technical Questions",
        type_az: "Texniki Suallar",
        question: 'What is the range of an e-bike on a single charge?',
        question_az: 'Bir şarjda elektrikli velosipedin məsafəsi nədir?',
        answer: 'The range of an e-bike depends on several factors, including the battery capacity, the level of motor assistance, terrain, and rider weight. Typically, you can expect a range of 20-50 miles per charge.',
        answer_az: 'Elektrikli velosipedin məsafəsi batareyanın tutumu, mühərrik dəstəyi səviyyəsi, ərazi və sürücünün kütləsi daxil olmaqla bir neçə amildən asılıdır. Ümumiyyətlə, bir şarjda 30-80 km məsafəni gözləyə bilərsiniz.'
        ,
    },
    {
        type: "Technical Questions",
        type_az: "Texniki Suallar",
        question: 'How long does it take to charge the battery?',
        question_az: 'Batareyanı doldurmaq üçün nə qədər vaxt lazımdır?',
        answer: 'Charging times vary based on the battery capacity and the charger used. On average, it takes 3-6 hours to fully charge an e-bike battery.',
        answer_az: 'Şarj müddəti batareyanın tutumundan və istifadə olunan şarj cihazından asılıdır. Elektrikli velosipedin batareyasının tam doldurulması orta hesabla 3-6 saat çəkir.'
        ,
    },
    {
        type: "Technical Questions",
        type_az: "Texniki Suallar",
        question: 'Can I ride an e-bike in the rain?',
        question_az: 'Yağışda e-velosiped sürə bilərəmmi?',
        answer: "Yes, most e-bikes are designed to be weather-resistant and can be ridden in the rain. However, it's important to avoid submerging the e-bike in water and to dry it off after riding in wet conditions.",
        answer_az: "Bəli, e-velosipedlərin əksəriyyəti hava şəraitinə davamlı və yağış yağanda sürülə bilən şəkildə hazırlanmışdır. Bununla birlikdə, e-velosipedinizi suya batırmamaq və nəm şəraitdə sürdükdən sonra qurutmaq vacibdir."
        ,
    },
    {
        type: "Maintenance Questions",
        type_az: "Baxım Sualları",
        question: 'How often do I need to service my e-bike?',
        question_az: 'E-velosipedimi nə qədər tez-tez servisə aparmalıyam?',
        answer: 'Regular maintenance is crucial for keeping your e-bike in good condition. We recommend servicing your e-bike every 6-12 months, depending on usage. Routine checks should include inspecting the brakes, tires, and battery.',
        answer_az: 'E-velosipedinizi yaxşı vəziyyətdə saxlamaq üçün müntəzəm texniki xidmət vacibdir. Xidmət şərtlərindən asılı olaraq hər 6-12 ayda bir təmir etməyi məsləhət görürük. Müntəzəm yoxlamalar əyləclərin, təkərlərin və batareyanın yoxlanılmasını əhatə etməlidir.'
        ,
    },
    {
        type: "Maintenance Questions",
        type_az: "Baxım Sualları",
        question: 'How do I maintain the battery?',
        question_az: 'Batareyanı necə saxlayım ki ömrü uzun olsun?',
        answer: 'To extend the life of your e-bike battery, follow these tips:',
        answer_az: 'Elektrikli velosipedinizin batareyanın ömrünü uzatmaq üçün bu tövsiyələrə əməl edin:',
        list: [
            "Avoid fully discharging the battery.",
            "Store the battery in a cool, dry place.",
            "Charge the battery regularly, even if not in use."
        ],
        list_az: [
            "Batareyanı tamamilə istifadə etməkdən çəkinin. 20% kifayətdir.",
            "Batareyanı sərin, quru yerdə saxlayın.",
            "Batareya istifadə olunmasa belə mütəmadi olaraq şarj edin.",
        ]
    },
    {
        type: "Maintenance Questions",
        type_az: "Baxım Sualları",
        question: 'Do I need a license to ride an e-bike?',
        question_az: 'E-velosiped sürmək üçün sürücülük vəsiqəsinə ehtiyacım varmı?',
        answer: 'In most regions, e-bikes do not require a license, but laws can vary. Check local regulations to ensure compliance with e-bike laws in your area.',
        answer_az: 'Əksər ölkələrdə e-velosiped lisenziyası tələb olunmur, lakin qanunlar fərqli ola bilər. Bölgənizin qanunlarına uyğun olduğundan əmin olmaq üçün yerli qaydaları oxuyun.'
        ,
    },
    {
        type: "Maintenance Questions",
        type_az: "Baxım Sualları",
        question: 'Are there speed limits for e-bikes?',
        question_az: 'E-velosipedlər üçün sürət məhdudiyyətləri varmı?',
        answer: 'Yes, many regions have speed limits for e-bikes. Typically, e-bikes are limited to a maximum speed of 20-28 mph (32-45 km/h) when using motor assistance.',
        answer_az: 'Bəli, bir çox bölgədə e-velosipedlər üçün sürət məhdudiyyətləri var. Tipik olaraq, sürücünün yardım sistemindən istifadə edərkən E-velosipedlərin maksimum sürəti 20-28 mil/saat (32-45 km / saat) təşkil edir.'
        ,
    },
    {
        type: "Purchase and Warranty Questions",
        type_az: "Satınalma və Zəmanət Sualları",
        question: 'What is the warranty on your e-bikes?',
        question_az: 'E-velosipedlərinizə zəmanət nədir?',
        answer: 'Our e-bikes come with a 5-year warranty covering manufacturing defects and certain components. For detailed warranty information, please refer to our warranty policy.',
        answer_az: 'E-velosipedlərimiz istehsal qüsurlarını və bəzi komponentləri əhatə edən 5 illik zəmanətlə gəlir. Zəmanət haqqında ətraflı məlumat üçün zəmanət siyasətimizə baxın.'
        ,
    },
    {
        type: "Purchase and Warranty Questions",
        type_az: "Satınalma və Zəmanət Sualları",
        question: 'Can I test ride an e-bike before purchasing?',
        question_az: 'Satın almadan əvvəl e-velosipedimi sınaqdan keçirə bilərəmmi?',
        answer: 'Yes, we offer test rides at our showroom locations. Please contact us to schedule a test ride and experience the benefits of our e-bikes firsthand.',
        answer_az: 'Bəli, salonlarımızda sınaq səfərləri təklif edirik. Zəhmət olmasa bir test gəzintisinə yazılmaq və e-velosipedlərimizin faydalarını şəxsən görmək üçün bizimlə əlaqə saxlayın.'
        ,
    },
    {
        type: "Purchase and Warranty Questions",
        type_az: "Satınalma və Zəmanət Sualları",
        question: 'Do you offer financing options?',
        question_az: 'Maliyyələşdirmə təklif edirsiniz?',
        answer: 'Yes, we offer flexible financing options to make owning an e-bike more affordable. Please visit our financing page for more information.',
        answer_az: 'Bəli, E-velosiped alışını daha sərfəli etmək üçün çevik maliyyələşdirmə variantları təklif edirik. Daha çox məlumat üçün maliyyələşdirmə səhifəmizi ziyarət edin.'
        ,
    },
    {
        type: "Support Questions",
        type_az: "Dəstək Sualları",
        question: 'What should I do if my e-bike has an issue?',
        question_az: 'E-velosipedimdə problem varsa nə etməliyəm?',
        answer: 'If you encounter any issues with your e-bike, please contact our customer support team. We offer troubleshooting assistance and repair services to get you back on the road.',
        answer_az: 'E-velosipedinizlə bağlı hər hansı bir probleminiz varsa, müştəri xidmətimizlə əlaqə saxlayın. Yenidən sürməyə başlamağınıza kömək etmək üçün problemlərin aradan qaldırılması və təmir yardımı təklif edirik.'
        ,
    },
    {
        type: "Support Questions",
        type_az: "Dəstək Sualları",
        question: 'How can I get in touch with customer support?',
        question_az: 'Müştəri xidməti ilə necə əlaqə saxlaya bilərəm?',
        answer: 'You can reach our customer support team via:',
        answer_az: 'Müştəri xidmətimizlə əlaqə saxlaya bilərsiniz:',
        list: [
            "Email: support@yourebikestore.com",
            "Phone: 1-800-123-4567",
            "Live chat on our website"
        ],
        list_az: [
            "Email: support@yourebikestore.com",
            "Telefon: 1-800-123-4567",
            "Bizim saytda birbaşa chat"
        ]
    }
];

export default accordionFAQ