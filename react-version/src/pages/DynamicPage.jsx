import { useLocation, Link } from "react-router-dom";
import "./DynamicPage.css";

const getPageData = (pathName) => {
  const defaultImage = "/images/personal_banking.png";
  
  const data = {
    // MAIN NAV OPTIONS
    personal: {
      title: "Personal Banking",
      image: "/images/personal_banking.png",
      desc: "Experience seamless personal banking tailored for your everyday needs with our comprehensive loan offerings.",
      subtopics: [
        { 
          title: "Personal Loan", 
          desc: "Quick and easy loans for personal needs, weddings, or emergencies.",
          image: "/images/personal_loan_new.png",
          loanDetails: {
            minAmount: "₹50,000",
            maxAmount: "₹40 Lakhs",
            tenure: "12 to 72 months",
            interestRate: "Starting at 10.50% p.a.",
            emiUrl: "#"
          }
        },
        { 
          title: "Car Loan", 
          desc: "Drive home your dream car with up to 100% on-road funding.",
          image: "/images/business_cards_new.png",
          loanDetails: {
            minAmount: "₹1 Lakh",
            maxAmount: "₹3 Crores",
            tenure: "12 to 84 months",
            interestRate: "Starting at 8.75% p.a.",
            emiUrl: "#"
          }
        },
        { 
          title: "Tractor Loan", 
          desc: "Empowering farmers with flexible terms and quick approvals.",
          image: "/images/tractor_loan_new.png",
          loanDetails: {
            minAmount: "₹1 Lakh",
            maxAmount: "₹15 Lakhs",
            tenure: "12 to 60 months",
            interestRate: "Starting at 11.50% p.a.",
            emiUrl: "#"
          }
        },
        { 
          title: "Home Loan", 
          desc: "Build your dream home with extended tenures and attractive rates.",
          image: "/images/sme_cards_new.png",
          loanDetails: {
            minAmount: "₹5 Lakhs",
            maxAmount: "₹10 Crores",
            tenure: "Up to 30 years",
            interestRate: "Starting at 8.35% p.a.",
            emiUrl: "#"
          }
        }
      ]
    },
    nri: {
      title: "NRI Banking",
      image: "/images/payment_cards_new.png",
      desc: "Tailored banking solutions for Non-Resident Indians across the globe.",
      subtopics: [
        { 
          title: "NRI Savings Account", 
          desc: "Reliable savings solutions securely managing your foreign earnings.",
          image: "/images/investments_cards_new.png",
          extraDetails: [
             { label: "Tax Exemption", text: "Interest earned on NRE balances is fully tax-free in India." },
             { label: "Repatriability", text: "Seamless unrestricted repatriation of your funds." }
          ]
        },
        { 
          title: "Salary Accounts", 
          desc: "Exclusive premium benefits for salaried NRI professionals.",
          image: "/images/personal_loan_new.png",
          extraDetails: [
             { label: "Zero Balance", text: "Enjoy a lifetime zero balance feature with regular salary credits." },
             { label: "Remittances", text: "Preferential exchange rates on inward remittances." }
          ]
        },
        { 
          title: "NRI Current Accounts", 
          desc: "Flexible, high-transaction volume accounts for global business flows.",
          image: "/images/tractor_loan_new.png",
          extraDetails: [
             { label: "Overdraft", text: "Easy overdraft facilities up to ₹50 Lakhs against deposits." },
             { label: "Cheque Book", text: "Free at-par cheque books supplied globally." }
          ]
        }
      ]
    },
    business: {
      title: "Business Banking",
      image: "/images/business_cards_new.png",
      desc: "Empowering your business with custom financial strategies.",
      subtopics: [
        { 
          title: "Working Capital", 
          desc: "Boost your business liquidity instantly.",
          image: "/images/sme_cards_new.png",
          loanDetails: { minAmount: "₹50 Lakhs", maxAmount: "₹50 Crores+", tenure: "Up to 12 months (Renewable)", interestRate: "Linked to Repo Rate", emiUrl: "#" }
        },
        { 
          title: "Merchant Services", 
          desc: "Streamline your payment collections efficiently.",
          image: "/images/payment_cards_new.png",
          extraDetails: [
             { label: "SmartHub Vyapar", text: "Comprehensive app for all collection and banking needs." },
             { label: "Card Machines", text: "Next-gen POS terminals with instant settlement facilities." }
          ]
        },
        { 
          title: "Trade Finance", 
          desc: "Global trade solutions for growing businesses.",
          image: "/images/investments_cards_new.png",
          extraDetails: [
             { label: "Letter of Credit", text: "Fast issuance with minimized risk for import/export." },
             { label: "Bank Guarantees", text: "Performance and financial guarantees tailored for tenders." }
          ]
        }
      ]
    },
    corporate: {
      title: "Corporate Banking",
      image: "/images/personal_loan_new.png",
      desc: "Strategic partnerships and complex financial solutions for corporations.",
      subtopics: [
        { 
          title: "Cash Management", 
          desc: "Optimize your cash flows efficiently.",
          image: "/images/tractor_loan_new.png",
          extraDetails: [
             { label: "Liquidity Mgt.", text: "Real-time fund sweeping and pooling across accounts." },
             { label: "Clearing", text: "Nationwide physical and digital clearing infrastructure." }
          ]
        },
        { 
          title: "Corporate Loans", 
          desc: "Scale your corporate operations.",
          image: "/images/business_cards_new.png",
          loanDetails: { minAmount: "₹10 Crores", maxAmount: "₹500 Crores+", tenure: "Project Specific", interestRate: "Customized Corporate Rate", emiUrl: "#" }
        },
        { 
          title: "Supply Chain Finance", 
          desc: "Unlock trapped cash in your supply chain.",
          image: "/images/sme_cards_new.png",
          extraDetails: [
             { label: "Vendor Finance", text: "Early payment discounts and enhanced supplier relations." },
             { label: "Dealer Finance", text: "Extended credit periods for your distribution network." }
          ]
        }
      ]
    },
    sme: {
      title: "SME Banking",
      image: "/images/payment_cards_new.png",
      desc: "Dedicated support for Small and Medium Enterprises.",
      subtopics: [
        { 
          title: "SME Loans", 
          desc: "Accessible credit targeted for SME growth.",
          image: "/images/investments_cards_new.png",
          loanDetails: { minAmount: "₹10 Lakhs", maxAmount: "₹25 Crores", tenure: "Up to 60 months", interestRate: "Starting from 9.25% p.a.", emiUrl: "#" }
        },
        { 
          title: "Current Accounts", 
          desc: "Business accounts tailored for small businesses.",
          image: "/images/personal_loan_new.png",
          extraDetails: [
             { label: "Free Limits", text: "High limits on cash deposits and withdrawals." },
             { label: "Waivers", text: "Zero balance requirements on specific digital accounts." }
          ]
        },
        { 
          title: "Government Schemes", 
          desc: "Benefit from business subsidies and grants.",
          image: "/images/tractor_loan_new.png",
          extraDetails: [
             { label: "CGTMSE", text: "Collateral-free loans up to ₹2 Crores under Govt. scheme." },
             { label: "MUDRA", text: "Funding for micro-enterprises with minimal documentation." }
          ]
        }
      ]
    },
    agri: {
      title: "Agriculture Banking",
      image: "/images/business_cards_new.png",
      desc: "Financial growth solutions for the agriculture sector.",
      subtopics: [
        { 
          title: "Kisan Gold Card", 
          desc: "Farming credit tailored precisely for you.",
          image: "/images/sme_cards_new.png",
          loanDetails: { minAmount: "₹10,000", maxAmount: "₹10 Lakhs", tenure: "Up to 5 years", interestRate: "Starts at 7.00% p.a.", emiUrl: "#" }
        },
        { 
          title: "Agri Implements", 
          desc: "Modernize your farming equipment.",
          image: "/images/payment_cards_new.png",
          extraDetails: [
             { label: "Funding", text: "Up to 90% funding for harvesters, diggers, and tools." },
             { label: "Process", text: "Minimal documentation with fast-track approvals." }
          ]
        },
        { 
          title: "Agri Infrastructure", 
          desc: "Build sustainable farming facilities.",
          image: "/images/investments_cards_new.png",
          extraDetails: [
             { label: "Warehouses", text: "Loans for building modern storage facilities." },
             { label: "Greenhouses", text: "Funding for advanced protected cultivation methods." }
          ]
        }
      ]
    },

    // SUB NAV OPTIONS
    accounts: {
      title: "Accounts",
      image: "/images/accounts.png",
      desc: "Manage your money securely with our range of accounts.",
      subtopics: [
        { title: "Savings Accounts", desc: "Earn interest while keeping your money accessible." },
        { title: "Current Accounts", desc: "Perfect for your daily business transactions." },
        { title: "Salary Accounts", desc: "Exclusive benefits for salaried professionals." }
      ]
    },
    deposits: {
      title: "Deposits",
      image: "/images/deposits.png",
      desc: "Grow your wealth securely with high-return deposit schemes.",
      subtopics: [
        { title: "Fixed Deposits", desc: "Unmatched interest rates for secure growth." },
        { title: "Recurring Deposits", desc: "Save small amounts regularly and build wealth." },
        { title: "Tax Saver Deposits", desc: "Save on taxes while growing your money." }
      ]
    },
    loans: {
      title: "Loans",
      image: "/images/loans.png",
      desc: "Flexible loan options to help you achieve your dreams faster with our comprehensive offerings.",
      subtopics: [
        { 
          title: "Personal Loan", 
          desc: "Quick and easy loans for personal needs, weddings, or emergencies.",
          image: "/images/personal_loan_new.png",
          loanDetails: {
            minAmount: "₹50,000",
            maxAmount: "₹40 Lakhs",
            tenure: "12 to 72 months",
            interestRate: "Starting at 10.50% p.a.",
            emiUrl: "#"
          }
        },
        { 
          title: "Car Loan", 
          desc: "Drive home your dream car with up to 100% on-road funding.",
          image: "/images/personal_loan_new.png",
          loanDetails: {
            minAmount: "₹1 Lakh",
            maxAmount: "₹3 Crores",
            tenure: "12 to 84 months",
            interestRate: "Starting at 8.75% p.a.",
            emiUrl: "#"
          }
        },
        { 
          title: "Tractor Loan", 
          desc: "Empowering farmers with flexible terms and quick approvals.",
          image: "/images/tractor_loan_new.png",
          loanDetails: {
            minAmount: "₹1 Lakh",
            maxAmount: "₹15 Lakhs",
            tenure: "12 to 60 months",
            interestRate: "Starting at 11.50% p.a.",
            emiUrl: "#"
          }
        },
        { 
          title: "Home Loan", 
          desc: "Build your dream home with extended tenures and attractive rates.",
          image: "/images/tractor_loan_new.png",
          loanDetails: {
            minAmount: "₹5 Lakhs",
            maxAmount: "₹10 Crores",
            tenure: "Up to 30 years",
            interestRate: "Starting at 8.35% p.a.",
            emiUrl: "#"
          }
        }
      ]
    },
    cards: {
      title: "Cards",
      image: "/images/business_cards_new.png",
      desc: "Discover a world of privileges and rewards with our premium cards.",
      subtopics: [
        { 
          title: "Infinia Credit Card", 
          desc: "The ultimate invite-only super premium card.",
          image: "/images/sme_cards_new.png",
          extraDetails: [
             { label: "Annual Fee", text: "₹12,500 + GST (Waived on ₹10L spend)" },
             { label: "Rewards", text: "5 Reward Points per ₹150 spent, unrestricted Lounge Access globally." }
          ]
        },
        { 
          title: "Regalia Gold", 
          desc: "Earn unmatched points and enjoy lifestyle benefits.",
          image: "/images/payment_cards_new.png",
          extraDetails: [
             { label: "Annual Fee", text: "₹2,500 + GST (Waived on ₹3L spend)" },
             { label: "Vouchers", text: "Flight & brand vouchers upon exciting milestone spends." }
          ]
        },
        { 
          title: "Platinum Debit Card", 
          desc: "Convenience and high-security for everyday spends.",
          image: "/images/investments_cards_new.png",
          extraDetails: [
             { label: "Cashback", text: "1% flat cashback on all domestic retail spends." },
             { label: "Limits", text: "High ₹1 Lakh ATM withdrawal limit per day." }
          ]
        }
      ]
    },
    investments: {
      title: "Investments",
      image: "/images/personal_loan_new.png",
      desc: "Smart investment solutions to multiply your wealth securely.",
      subtopics: [
        { 
          title: "Mutual Funds", 
          desc: "Diversified portfolios for market-beating returns.",
          image: "/images/tractor_loan_new.png",
          extraDetails: [
             { label: "Options", text: "SIPs starting at just ₹500 per month seamlessly." },
             { label: "Tracking", text: "Consolidated views natively available on NetBanking & Mobile App." }
          ]
        },
        { 
          title: "Demat Account", 
          desc: "Trading made simple, digital, and secure.",
          image: "/images/business_cards_new.png",
          extraDetails: [
             { label: "Opening Fees", text: "Zero account opening charges online." },
             { label: "Brokerage", text: "Highly competitive flat-fee structures available." }
          ]
        },
        { 
          title: "Bonds & Securities", 
          desc: "Stable returns for conservative investors.",
          image: "/images/sme_cards_new.png",
          extraDetails: [
             { label: "RBI Bonds", text: "High guaranteed returns safely backed by the Government." },
             { label: "SGBs", text: "Fixed interest + gold appreciation totally tax-free on maturity." }
          ]
        }
      ]
    },
    insurance: {
      title: "Insurance",
      image: "/images/payment_cards_new.png",
      desc: "Comprehensive protection for you, your health, and your assets.",
      subtopics: [
        { 
          title: "Term Life Insurance", 
          desc: "Secure your family's financial future completely.",
          image: "/images/investments_cards_new.png",
          extraDetails: [
             { label: "Cover", text: "₹1 Crore massive cover starting at just ₹500/month." },
             { label: "Settlement", text: "99.04% high claim settlement ratio." }
          ]
        },
        { 
          title: "Health Insurance", 
          desc: "Cover massive unexpected medical expenses easily.",
          image: "/images/personal_loan_new.png",
          extraDetails: [
             { label: "Network", text: "Over 10,000+ cashless network hospitals globally available." },
             { label: "Benefits", text: "Free annual check-ups & no room rent capping restrictions." }
          ]
        },
        { 
          title: "Motor Insurance", 
          desc: "Protect your vehicles against unexpected damages.",
          image: "/images/tractor_loan_new.png",
          extraDetails: [
             { label: "Add-ons", text: "Zero Depreciation, Engine Protect, Key Replacement Covers." },
             { label: "Inspections", text: "Instant policy issuance with DIY video smartphone inspection." }
          ]
        }
      ]
    },
    forex: {
      title: "Forex",
      image: "/images/business_cards_new.png",
      desc: "Seamless foreign exchange solutions for your global needs.",
      subtopics: [
        { 
          title: "Multicurrency Forex Cards", 
          desc: "Travel cashless and hassle-free worldwide.",
          image: "/images/sme_cards_new.png",
          extraDetails: [
             { label: "Currencies", text: "Load up to 23 currencies comprehensively on a single card." },
             { label: "Protection", text: "Zero cross-currency markup if holding the local base currency." }
          ]
        },
        { 
          title: "Outward Remittance", 
          desc: "Send money abroad safely digitally.",
          image: "/images/payment_cards_new.png",
          extraDetails: [
             { label: "Method", text: "Instant overseas transfers via NetBanking or Branch visits." },
             { label: "Limits", text: "Transfer up to $250,000 annually seamlessly under LRS." }
          ]
        },
        { 
          title: "Currency Notes", 
          desc: "Best exchange rates for authentic foreign cash.",
          image: "/images/investments_cards_new.png",
          extraDetails: [
             { label: "Availability", text: "Over 20+ global currencies ready rapidly at designated branches." },
             { label: "Rates", text: "Live competitive exchange rates matched and locked instantly." }
          ]
        }
      ]
    },
    pay: {
      title: "Pay",
      image: "/images/personal_loan_new.png",
      desc: "Quick, secure, multi-channel payment options.",
      subtopics: [
        { 
          title: "UPI Payments (PayZapp)", 
          desc: "Instant transfers right from your phone.",
          image: "/images/tractor_loan_new.png",
          extraDetails: [
             { label: "Rewards", text: "Earn CashPoints on every merchant UPI scanner." },
             { label: "Links", text: "Link any bank account safely, powered directly by NPCI." }
          ]
        },
        { 
          title: "Smart BillPay", 
          desc: "Never miss a utility bill deadline again.",
          image: "/images/business_cards_new.png",
          extraDetails: [
             { label: "Auto-Pay", text: "Set and forget standing instructions for Electricity, Mobile, DTH." },
             { label: "Coverage", text: "Over 1 Lakh+ registered certified billers India-wide." }
          ]
        },
        { 
          title: "FASTag", 
          desc: "Breeze effortlessly through highway tolls.",
          image: "/images/sme_cards_new.png",
          extraDetails: [
             { label: "Reload", text: "Auto-recharge logic directly tied to your HDFC primary account." },
             { label: "Fuel", text: "Use FASTag securely directly to pay for HPCL fuel stations." }
          ]
        }
      ]
    },
    about: {
      title: "About Us",
      image: "/images/business.png",
      desc: "HDFC Bank is one of India's leading private banks and was among the first to receive approval from the Reserve Bank of India (RBI) to set up a private sector bank in 1994.",
      subtopics: [
        { 
          title: "Our History", 
          desc: "Incorporated in 1994, HDFC Bank began operations as a Scheduled Commercial Bank in 1995.",
          extraDetails: [
            { label: "Founder Details", text: "H.T. Parekh, a visionary who pioneered housing finance in India." },
            { label: "Who Are We", text: "A leading private sector bank offering diverse financial products and services." },
            { label: "HDFC Legacy", text: "Over 3 decades of trust, excellence, and a customer-first approach." },
            { label: "Technology", text: "Pioneering digital banking with state-of-the-art secure infrastructure." }
          ]
        },
        { 
          title: "Management", 
          desc: "Led by a board of directors comprising eminent individuals with a wealth of experience.",
          extraDetails: [
            { label: "Management Details", text: "Guided by Sashidhar Jagdishan (MD & CEO) alongside a robust executive team." },
            { label: "Business Details", text: "Spanning retail, wholesale, and treasury operations globally with widespread branches." }
          ]
        },
        { 
          title: "Awards", 
          desc: "Consistently winning awards for digital banking, corporate governance, and CSR.",
          awardsList: [
            "Best Bank in India 2023 - Euromoney",
            "Asian Bank of The Year - IFR Asia",
            "Best Digital Bank - Asiamoney",
            "Safest Bank in India - Global Finance",
            "Excellence in CSR - CII ITC Sustainability",
            "Best Large Bank - Business Today",
            "Most Valuable Brand - BrandZ India",
            "Best Innovator - Finnoviti",
            "Top Private Bank - Dun & Bradstreet",
            "Best Employer - Kincentric"
          ]
        }
      ]
    }
  };

  return data[pathName.toLowerCase()] || {
    title: pathName ? pathName.charAt(0).toUpperCase() + pathName.slice(1) : "Page",
    image: "/images/personal_banking.png",
    desc: `Explore all the features and options for ${pathName}. We are here to serve your needs.`,
    subtopics: [
      { title: "Feature Overview", desc: `Get a quick overview of ${pathName} and its core benefits.` },
      { title: "Detailed Offerings", desc: "Explore customized offerings designed to meet your needs." },
      { title: "Support & Services", desc: "Dedicated support regarding all your queries and issues." }
    ]
  };
};

export default function DynamicPage() {
  const location = useLocation();
  const pathName = location.pathname.replace("/", "");
  const pageData = getPageData(pathName);

  return (
    <div className="hdfc-page">
      <div className="hdfc-breadcrumb">
        <div className="container">
          <span style={{color: '#004c8f', cursor: 'pointer'}}>Home</span> {'>'} {pageData.title}
        </div>
      </div>

      <div className="hdfc-hero" style={{ backgroundImage: `url(${pageData.image})` }}>
         <div className="hdfc-hero-content container">
            <div className="hdfc-hero-box">
               <h1>{pageData.title}</h1>
               <p>{pageData.desc}</p>

            </div>
         </div>
      </div>

      <div className="hdfc-content container">
         <h2 className="hdfc-section-title">Explore {pageData.title}</h2>
         
         <div className="hdfc-product-grid">
            {pageData.subtopics.map((sub, index) => (
               <div className="hdfc-product-card" key={index}>
                  <div className="card-top-accent"></div>
                  {sub.image && (
                    <div className="card-custom-image-wrapper">
                      <img src={sub.image} alt={sub.title} className="card-custom-image" />
                    </div>
                  )}
                  <h3>{sub.title}</h3>
                  <p>{sub.desc}</p>
                  {sub.loanDetails && (
                    <div className="loan-specs">
                       <div className="loan-spec-item">
                          <span>Amount:</span> <strong>{sub.loanDetails.minAmount} - {sub.loanDetails.maxAmount}</strong>
                       </div>
                       <div className="loan-spec-item">
                          <span>Tenure:</span> <strong>{sub.loanDetails.tenure}</strong>
                       </div>
                       <div className="loan-spec-item">
                          <span>Interest Rate:</span> <strong style={{color: '#e9031c'}}>{sub.loanDetails.interestRate}</strong>
                       </div>
                       <a href={sub.loanDetails.emiUrl} className="emi-highlight">🧮 Calculate EMI</a>
                    </div>
                  )}
                  {sub.extraDetails && (
                    <div className="about-extra-details">
                      {sub.extraDetails.map((detail, dIdx) => (
                        <div className="about-detail-item" key={dIdx}>
                          <strong>{detail.label}:</strong> {detail.text}
                        </div>
                      ))}
                    </div>
                  )}

                  {sub.awardsList && (
                    <div className="about-awards-list">
                      {sub.awardsList.map((award, aIdx) => (
                        <div className="award-badge" key={aIdx}>
                          <span className="award-icon">🏆</span>
                          <span className="award-text">{award}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {pathName !== 'about' && (
                    <div className="card-links" style={{ marginTop: (sub.extraDetails || sub.loanDetails) ? '15px' : '0' }}>
                       <Link to={`/apply-loan?type=${encodeURIComponent(sub.title.toLowerCase().replace(' ', '-'))}`} className="hdfc-text-link apply">APPLY ONLINE <span>›</span></Link>
                    </div>
                  )}
               </div>
            ))}
         </div>

         <div className="hdfc-info-section">
           <div className="info-text">
             <h3>Why choose our {pageData.title} products?</h3>
             <p>As India's leading private sector bank, we offer customized solutions for your {pageData.title.toLowerCase()} needs. Enjoy unmatched benefits, quick processing, and seamless digital access to manage everything from your fingertips.</p>
           </div>
           <div className="info-image">
              <img src={pageData.image} alt={pageData.title} />
           </div>
         </div>
      </div>
    </div>
  );
}
