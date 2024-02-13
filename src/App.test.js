import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './components/FormCSV'

describe('Form component', () => {
  test('renders form with input fields', () => {
    render(<Form />);
    const fname=screen.getByLabelText(/first name/i);
    expect(fname).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    // expect(screen.getByLabelText('Upload CSV File')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });



  test('handles file upload and updates excelData', async () => {
    const file = new File(['dummy content'], 'test.csv', { type: 'text/csv' });
    const { container } = render(<Form />);

    // const fileInput = screen.getByLabelText('Upload CSV File');
    // fireEvent.change(fileInput, { target: { files: [file] } });

  //   // Mock FileReader's onload function
    global.FileReader.prototype.readAsArrayBuffer = jest.fn(function () {
      this.onload({
        target: {
          result: 'dummy array buffer content',
        },
      });
    });

  //   // Wait for the asynchronous file reading to complete
    await screen.findByText('No File is uploaded yet!');

  //   // Assertions related to excelData update
  //   // Modify these based on your actual excelData structure
    const storedData = localStorage.getItem('excelData');
    const dataArray = storedData ? JSON.parse(storedData) : [];

    // expect(dataArray).toHaveLength(1); // Modify based on your actual data length
    expect(container).toMatchSnapshot();
  });

  // // Add more tests based on your component's functionality

  test('submits form and validates input fields', () => {
    render(<Form />);
  //   // Implement the form submission and validation tests
  });
});
