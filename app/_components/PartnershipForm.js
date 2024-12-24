import { useState } from "react";
import { getCurrentUser, requestPartnership } from "../_lib/_api/userServices";

function PartnershipForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    businessLink: "",
    motivationalLetter: "",
    isTermsAccepted: false,
  });

  console.log(formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await getCurrentUser();
    console.log(user);

    if (user.user.id) {
      const data = await requestPartnership({
        ...formData,
        userId: user.user.id,
      });
      if (data) {
        window.location.href = "/account/user";
      }
    }
    // handle form submission (e.g., save data or send to API)
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Apply for Partnership
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700"
          >
            Business Name (if applicable)
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="businessLink"
            className="block text-sm font-medium text-gray-700"
          >
            Business Website or Social Media Links
          </label>
          <input
            type="url"
            id="businessLink"
            name="businessLink"
            value={formData.businessLink}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="motivationalLetter"
            className="block text-sm font-medium text-gray-700"
          >
            Motivational letter
          </label>
          <textarea
            id="motivationalLetter"
            name="motivationalLetter"
            value={formData.motivationalLetter}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2 flex items-center">
          <input
            type="checkbox"
            id="isTermsAccepted"
            name="isTermsAccepted"
            checked={formData.isTermsAccepted}
            onChange={(e) =>
              setFormData({ ...formData, isTermsAccepted: e.target.checked })
            }
            className="h-4 w-4 text-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="isTermsAccepted" className="text-sm text-gray-700">
            I agree to the terms and conditions
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!formData.isTermsAccepted}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default PartnershipForm;
