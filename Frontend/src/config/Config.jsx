export const signUpFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'Enter Your User Name',
        type: 'text',
        componentType: 'input'
    },
    {
        name: 'userEmail',
        label: 'User Email',
        placeholder: 'Enter Your Email',
        type: 'email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter Your Password',
        type: 'password',
        componentType: 'input'
    }
]

export const signInFormControls = [
    {
        name: 'userEmail',
        label: 'User Email',
        placeholder: 'Enter Your Email',
        type: 'email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter Your Password',
        type: 'password',
        componentType: 'input'
    }
]

export const initialSignInFormData = {
    userEmail: '',
    password: ''
}

export const initialSignUpFormData = {
    userName: '',
    userEmail: '',
    password: ''
}

export const languageOptions = [
    {id: 'english', label: 'English'},
    {id: 'spanish', label: 'Spanish'},
    {id: 'french', label: 'French'},
    {id: 'german', label: 'German'},
    {id: 'chinese', label: 'Chinese'},
    {id: 'japanese', label: 'Japanese'},
    {id: 'korean', label: 'Korean'},
    {id: 'portuguese', label: 'Portuguese'},
    {id: 'arabic', label: 'Arabic'},
    {id: 'russian', label: 'Russian'}
]

export const courseLevelOptions = [
    {id: 'beginner', label: 'Beginner'},
    {id: 'intermediate', label: 'Intermediate'},
    {id: 'advanced', label: 'Advanced'}
]

export const courseCategories = [
    {id: 'web-development', label: 'Web Development'},
    {id: 'backend-development', label: 'Backend Development'},
    {id: 'data-science', label: 'Data Science'},
    {id: 'machine-learning', label: 'Machine Learning'},
    {id: 'artificial-intelligence', label: 'Artificial Intelligence'},
    {id: 'cloud-computing', label: 'Cloud Computing'},
    {id: 'cyber-security', label: 'Cyber Security'},
    {id: 'mobile-development', label: 'Mobile Development'},
    {id: 'game-development', label: 'Game Development'},
    {id: 'software-engineering', label: 'Software Engineering'}
]

export const courseLangingPageFormControls = [
    {
        name: 'title',
        label: 'Title',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter Course Title'
    },
    {
        name: 'category',
        label: 'Category',
        componentType: 'select',
        type: 'text',
        placeholder: '',
        options: courseCategories
    },
    {
        name: 'level',
        label: 'Level',
        componentType: 'select',
        type: 'text',
        placeholder: '',
        options: courseLevelOptions
    },
    {
        name: 'primaryLanguage',
        label: 'Primary Language',
        componentType: 'select',
        type: 'text',
        placeholder: '',
        options: languageOptions
    },
    {
        name: 'subtitle',
        label: 'Subtitle',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter Course Subtitle'
    },
    {
        name: 'description',
        label: 'Description',
        componentType: 'textarea',
        type: 'text',
        placeholder: 'Enter Course Description'
    },
    {
        name: 'pricing',
        label: 'Pricing',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter Course Pricing'
    },
    {
        name: 'objectives',
        label: 'Objectives',
        componentType: 'textarea',
        type: 'text',
        placeholder: 'Enter Course Objectives'
    },
    {
        name: 'welcomeMessage',
        label: 'Welcome Message',
        componentType: 'textarea',
        placeholder: 'Welcome Message For Students'
    }
]

export const courseLandingInitialFormData = {
    title: '',
    category: '',
    level: '',
    primaryLanguage: '',
    subtitle: '',
    description: '',
    pricing: '',
    objectives: '',
    welcomeMessage: '',
    iamge: ''
}

export const courseCurriculumInitialFormData = [
    {
        title: '',
        videoUrl: '',
        freePreview: false,
        public_id: '',
    }
]