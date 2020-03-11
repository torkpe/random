import authRoutes from './auth';
import adminRoutes from './admin';
import agentRoutes from './agent';
import userRoutes from './user';

export default app => {
  const apiVersion = '/api/v1'
  app.use(`${apiVersion}/auth/`, authRoutes);
  app.use(`${apiVersion}/admin/`, adminRoutes);
  app.use(`${apiVersion}/agent/`, agentRoutes);
  app.use(`${apiVersion}/users/`, userRoutes);
}