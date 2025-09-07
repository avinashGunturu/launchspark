
import React from 'react';
import { Link } from 'react-router-dom';

const PolicySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 border-b border-border pb-2">{title}</h2>
        <div className="space-y-4 text-muted leading-relaxed">
            {children}
        </div>
    </div>
);

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="main-page-fade pt-32 pb-24 bg-background">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-lg text-muted">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <PolicySection title="Introduction">
                    <p>
                        Welcome to LaunchSpark ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                    </p>
                </PolicySection>

                <PolicySection title="Information We Collect">
                    <p>
                        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                    </p>
                    <h3 className="text-xl font-semibold text-foreground pt-2">Personal Data</h3>
                    <p>
                        Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you fill out a contact form or a quote request form. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Site.
                    </p>
                     <h3 className="text-xl font-semibold text-foreground pt-2">Derivative Data</h3>
                    <p>
                        Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                    </p>
                </PolicySection>
                
                <PolicySection title="How We Use Your Information">
                    <p>
                        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Respond to your inquiries and provide you with a quote for our services.</li>
                        <li>Email you regarding your project or our services.</li>
                        <li>Improve our website and service offerings.</li>
                        <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                        <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                    </ul>
                </PolicySection>
                
                <PolicySection title="Disclosure of Your Information">
                     <p>
                        We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
                    </p>
                </PolicySection>
                
                <PolicySection title="Security of Your Information">
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>
                </PolicySection>

                <PolicySection title="Your Data Rights">
                    <p>
                        You have the right to request access to the personal data we hold about you, to have any inaccuracies corrected, and to request the deletion of your personal data. If you wish to exercise any of these rights, please contact us using the contact information provided below.
                    </p>
                </PolicySection>

                 <PolicySection title="Changes to This Privacy Policy">
                    <p>
                        We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.
                    </p>
                </PolicySection>

                <PolicySection title="Contact Us">
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us at:
                        <br />
                        Email: <a href="mailto:launchspark.in@gmail.com" className="text-primary hover:underline">launchspark.in@gmail.com</a>
                        <br />
                        Or by using the form on our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>.
                    </p>
                </PolicySection>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
