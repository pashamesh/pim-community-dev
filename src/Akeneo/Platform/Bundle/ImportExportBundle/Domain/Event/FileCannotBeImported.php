<?php

declare(strict_types=1);

/*
 * This file is part of the Akeneo PIM Enterprise Edition.
 *
 * (c) 2022 Akeneo SAS (https://www.akeneo.com)
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Akeneo\Platform\Bundle\ImportExportBundle\Domain\Event;

final class FileCannotBeImported
{
    public function __construct(private string $reason)
    {
    }

    public function getReason(): string
    {
        return $this->reason;
    }
}