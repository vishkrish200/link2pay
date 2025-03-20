// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
}); 