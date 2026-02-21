# odin-calculator

This is the 5th and final project in The Odin Project's Foundations course.

It's a calculator that supports basic operations (addition, subtraction, multiplication, and division).

---

You can find detailed instructions on the TOP website [here](https://www.theodinproject.com/lessons/foundations-calculator).

---

For this project, I tried to refine the style using CSS so that the final result wouldn't be too ugly.

I implemented all the functionalities. The site supports standard operations that can be chained together without difficulty. The rounding operation is static (4 decimal places) regardless of the number—which obviously poses a problem for numbers smaller than 0.0001.

Obviously, the calculator displays an error message if the user tries to perform a division by 0.

There is a "clear" function to return to a blank entry. There is also a "delete" function which removes the last entry (all entries since the last evaluation are kept in memory).

Finally, the calculator supports keyboard input. Only the "+/-" key is not supported. The "=" key is accessed via the equivalent key on the keyboard or by pressing "Enter". And the "clear" key is accessed via the "Esc" key.
