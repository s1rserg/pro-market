import {
  Category,
  Filter,
  Subcategory,
} from '~/modules/attributes/attribute.model';

export const populateData = async () => {
  try {
    const categories = [
      { name: 'Development', key: 'cat_dev' },
      { name: 'Design', key: 'cat_des' },
      { name: 'Writing', key: 'cat_wrt' },
      { name: 'Marketing', key: 'cat_mkt' },
      { name: 'Business', key: 'cat_bus' },
      { name: 'Finance', key: 'cat_fin' },
      { name: 'Lifestyle', key: 'cat_life' },
    ];

    await Category.insertMany(categories);
    console.log('Categories inserted!');

    const subcategories = [
      // Development Subcategories
      { name: 'Web Development', key: 'sub_webdev' },
      { name: 'Mobile Development', key: 'sub_mobiledev' },
      { name: 'Data Science', key: 'sub_datasci' },
      { name: 'Game Development', key: 'sub_gamedev' },
      { name: 'DevOps', key: 'sub_devops' },
      { name: 'Machine Learning', key: 'sub_ml' },
      { name: 'Cybersecurity', key: 'sub_cybersec' },

      // Design Subcategories
      { name: 'Graphic Design', key: 'sub_graphicdes' },
      { name: 'UI/UX Design', key: 'sub_uiux' },
      { name: 'Animation', key: 'sub_animation' },
      { name: '3D Modeling', key: 'sub_3dmodel' },
      { name: 'Illustration', key: 'sub_illustration' },
      { name: 'Interior Design', key: 'sub_interiordes' },
      { name: 'Fashion Design', key: 'sub_fashiondes' },

      // Writing Subcategories
      { name: 'Copywriting', key: 'sub_copy' },
      { name: 'Technical Writing', key: 'sub_techwrite' },
      { name: 'Content Writing', key: 'sub_content' },
      { name: 'Creative Writing', key: 'sub_creative' },
      { name: 'Editing & Proofreading', key: 'sub_editproof' },
      { name: 'SEO Writing', key: 'sub_seowrite' },
      { name: 'Ghostwriting', key: 'sub_ghostwrite' },

      // Marketing Subcategories
      { name: 'Social Media Marketing', key: 'sub_smm' },
      { name: 'Email Marketing', key: 'sub_emailmkt' },
      { name: 'SEO', key: 'sub_seo' },
      { name: 'Content Marketing', key: 'sub_contentmkt' },
      { name: 'PPC Advertising', key: 'sub_ppc' },
      { name: 'Influencer Marketing', key: 'sub_influencer' },
      { name: 'Affiliate Marketing', key: 'sub_affiliate' },

      // Business Subcategories
      { name: 'Consulting', key: 'sub_consult' },
      { name: 'Project Management', key: 'sub_projmanage' },
      { name: 'Human Resources', key: 'sub_hr' },
      { name: 'Business Strategy', key: 'sub_bizstrategy' },
      { name: 'Sales', key: 'sub_sales' },
      { name: 'Operations Management', key: 'sub_opsmanage' },
      { name: 'Customer Support', key: 'sub_custsupport' },

      // Finance Subcategories
      { name: 'Accounting', key: 'sub_accounting' },
      { name: 'Financial Analysis', key: 'sub_finanalysis' },
      { name: 'Investment Research', key: 'sub_investresearch' },
      { name: 'Tax Preparation', key: 'sub_taxprep' },
      { name: 'Bookkeeping', key: 'sub_bookkeeping' },
      { name: 'Auditing', key: 'sub_audit' },
      { name: 'Payroll Management', key: 'sub_payroll' },

      // Lifestyle Subcategories
      { name: 'Personal Coaching', key: 'sub_perscoach' },
      { name: 'Nutrition', key: 'sub_nutrition' },
      { name: 'Fitness Training', key: 'sub_fittrain' },
      { name: 'Mental Health', key: 'sub_mentalhealth' },
      { name: 'Travel Planning', key: 'sub_travelplan' },
      { name: 'Event Planning', key: 'sub_eventplan' },
      { name: 'Home Organization', key: 'sub_homeorg' },
    ];

    await Subcategory.insertMany(subcategories);
    console.log('Subcategories inserted!');

    const filters = [
      { name: 'Beginner', key: 'fil_beg' },
      { name: 'Intermediate', key: 'fil_int' },
      { name: 'Advanced', key: 'fil_adv' },
      { name: 'Strict', key: 'fil_strict' },
      { name: 'Friendly', key: 'fil_friendly' },
      { name: 'Remote', key: 'fil_remote' },
      { name: 'On-Site', key: 'fil_onsite' },
      { name: 'Contract', key: 'fil_contract' },
      { name: 'Full-Time', key: 'fil_fulltime' },
      { name: 'Part-Time', key: 'fil_parttime' },
      { name: 'Freelance', key: 'fil_freelance' },
      { name: 'Project-Based', key: 'fil_project' },
    ];

    await Filter.insertMany(filters);
    console.log('Filters inserted!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};
