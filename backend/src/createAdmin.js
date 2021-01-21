import { registerService } from './services/register.service';

registerService.insertNewUser('admin', 'password', true).then(() => process.exit());
