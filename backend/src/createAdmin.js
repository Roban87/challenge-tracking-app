import { registerService } from './services/register.service';

registerService.insertNewUser('admin', 'password', 'admin@email.com', true).then(() => process.exit());
